import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { EmailService } from '../email/email.service';
import { CacheService } from '../cache/cache.service';

describe('UsersService - Alternative Email Redundancy', () => {
  let service: UsersService;
  let mockDb: any;
  let mockEmailService: any;
  let mockCacheService: any;

  beforeEach(async () => {
    mockDb = {
      update: jest.fn().mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([{ id: '1' }])
          })
        })
      }),
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([])
        })
      }),
      insert: jest.fn().mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ id: '1' }])
        })
      }),
      query: {
        users: {
          findFirst: jest.fn(),
        },
      },
    };

    mockEmailService = {
      sendVerificationEmail: jest.fn().mockResolvedValue(true),
    };

    mockCacheService = {
      get: jest.fn().mockReturnValue(null), // default: no cooldown active
      set: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'DRIZZLE_DB', useValue: mockDb },
        { provide: EmailService, useValue: mockEmailService },
        { provide: CacheService, useValue: mockCacheService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('deleteAlternativeEmail', () => {
    it('should successfully nullify alternative email fields', async () => {
      const walletAddress = '0x1234';
      const result = await service.deleteAlternativeEmail(walletAddress);
      expect(mockDb.update).toHaveBeenCalled();
      expect(result).toEqual({ success: true });
    });
  });

  describe('verifyAlternativeEmail', () => {
    it('should fail if no verification token exists or email is not pending', async () => {
      mockDb.query.users.findFirst.mockResolvedValueOnce({
        id: '1',
        alternativeEmailVerificationToken: null,
        alternativePendingEmail: null,
      });

      const result = await service.verifyAlternativeEmail('1', '123456');
      expect(result.success).toBe(false);
      expect(result.message).toContain('No alternative verification request pending');
    });

    it('should fail if code is incorrect', async () => {
      mockDb.query.users.findFirst.mockResolvedValueOnce({
        id: '1',
        alternativeEmailVerificationToken: '654321',
        alternativePendingEmail: 'test@example.com',
      });
      mockCacheService.get.mockReturnValueOnce(null);  // attempts = 0

      const result = await service.verifyAlternativeEmail('1', '123456');
      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid verification code. Attempt 1/5');
    });

    it('should succeed and update user profile on correct code', async () => {
      mockDb.query.users.findFirst.mockResolvedValueOnce({
        id: '1',
        alternativeEmailVerificationToken: '123456',
        alternativePendingEmail: 'test@example.com',
      });

      const result = await service.verifyAlternativeEmail('1', '123456');
      expect(result.success).toBe(true);
      expect(result.alternativeEmail).toBe('test@example.com');
      expect(mockDb.update).toHaveBeenCalled();
    });

    it('should fail if no token is pending or already used', async () => {
      mockDb.query.users.findFirst.mockResolvedValueOnce({
        id: '1',
        alternativeEmailVerified: true,
        alternativeEmailVerificationToken: null,
        alternativePendingEmail: null,
      });

      const result = await service.verifyAlternativeEmail('1', '123456');
      expect(result.success).toBe(false);
      expect(result.message).toBe('This alternative email has already been verified.');
    });
  });

  describe('resendAlternativeVerificationCode', () => {
    it('should fail if user is not found', async () => {
      mockDb.query.users.findFirst.mockResolvedValueOnce(null);
      await expect(service.resendAlternativeVerificationCode('1')).rejects.toThrow();
    });

    it('should fail if requested within 15-second cooldown (cache key active)', async () => {
      mockDb.query.users.findFirst.mockResolvedValueOnce({
        id: '1',
        alternativePendingEmail: 'pending@example.com',
        alternativeEmailVerified: false,
      });
      // Cooldown active
      mockCacheService.get.mockReturnValue(true);

      await expect(service.resendAlternativeVerificationCode('1')).rejects.toThrow('Please wait 15 seconds');
    });

    it('should succeed if requested after 15-second cooldown (cache key gone)', async () => {
      mockDb.query.users.findFirst.mockResolvedValueOnce({
        id: '1',
        alternativePendingEmail: 'pending@example.com',
        alternativeEmailVerified: false,
      });
      // No cooldown
      mockCacheService.get.mockReturnValue(null);

      const result = await service.resendAlternativeVerificationCode('1');
      expect(result.success).toBe(true);
      expect(mockEmailService.sendVerificationEmail).toHaveBeenCalled();
    });

    it('should send a new verification code if alternative email setup is pending', async () => {
      mockDb.query.users.findFirst.mockResolvedValueOnce({
        id: '1',
        alternativePendingEmail: 'pending@example.com',
        alternativeEmailVerified: false,
      });
      mockCacheService.get.mockReturnValue(null);

      const result = await service.resendAlternativeVerificationCode('1');
      expect(result.success).toBe(true);
      expect(mockEmailService.sendVerificationEmail).toHaveBeenCalled();
    });
  });
});
