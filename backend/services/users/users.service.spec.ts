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
      get: jest.fn().mockImplementation((key: string) => {
        if (key.includes('sent_at')) {
          return Date.now() - 20000;
        }
        return 0;
      }),
      set: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'DRIZZLE_DB',
          useValue: mockDb,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
        {
          provide: CacheService,
          useValue: mockCacheService,
        },
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

  describe('verifyEmail', () => {
    it('should fail if no verification token exists or email is not pending', async () => {
      mockDb.query.users.findFirst.mockResolvedValueOnce({
        id: '1',
        emailVerificationToken: null,
        pendingEmail: null,
      });

      const result = await service.verifyEmail('1', '123456');
      expect(result.success).toBe(false);
      expect(result.message).toBe('No verification request pending');
    });

    it('should fail if OTP has expired (not in cache)', async () => {
      mockDb.query.users.findFirst.mockResolvedValueOnce({
        id: '1',
        emailVerificationToken: '123456',
        pendingEmail: 'test@example.com',
      });
      mockCacheService.get
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(undefined);

      const result = await service.verifyEmail('1', '123456');
      expect(result.success).toBe(false);
      expect(result.message).toContain('expired');
    });

    it('should fail if email is already in use by another user', async () => {
      mockDb.query.users.findFirst
        .mockResolvedValueOnce({
          id: '1',
          emailVerificationToken: '123456',
          pendingEmail: 'duplicate@example.com',
        })
        .mockResolvedValueOnce({
          id: '2',
          email: 'duplicate@example.com',
        });

      const result = await service.verifyEmail('1', '123456');
      expect(result.success).toBe(false);
      expect(result.message).toBe('This email is already registered to another account.');
    });

    it('should succeed and update user profile on correct code', async () => {
      mockDb.query.users.findFirst
        .mockResolvedValueOnce({
          id: '1',
          emailVerificationToken: '123456',
          pendingEmail: 'test@example.com',
        })
        .mockResolvedValueOnce(null);

      const result = await service.verifyEmail('1', '123456');
      expect(result.success).toBe(true);
      expect(result.email).toBe('test@example.com');
      expect(mockDb.update).toHaveBeenCalled();
    });
  });

  describe('resendVerificationCode', () => {
    it('should fail if user is not found', async () => {
      mockDb.query.users.findFirst.mockResolvedValueOnce(null);
      await expect(service.resendVerificationCode('1')).rejects.toThrow();
    });

    it('should send a new verification code if email setup is pending', async () => {
      mockDb.query.users.findFirst
        .mockResolvedValueOnce({
          id: '1',
          pendingEmail: 'pending@example.com',
          emailVerified: false,
        })
        .mockResolvedValueOnce(null);

      const result = await service.resendVerificationCode('1');
      expect(result.success).toBe(true);
      expect(mockEmailService.sendVerificationEmail).toHaveBeenCalled();
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
      expect(result.message).toBe('No alternative verification request pending');
    });

    it('should fail if code is incorrect', async () => {
      mockDb.query.users.findFirst.mockResolvedValueOnce({
        id: '1',
        alternativeEmailVerificationToken: '654321',
        alternativePendingEmail: 'test@example.com',
      });

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
  });

  describe('resendAlternativeVerificationCode', () => {
    it('should fail if user is not found', async () => {
      mockDb.query.users.findFirst.mockResolvedValueOnce(null);
      await expect(service.resendAlternativeVerificationCode('1')).rejects.toThrow();
    });

    it('should send a new verification code if alternative email setup is pending', async () => {
      mockDb.query.users.findFirst.mockResolvedValueOnce({
        id: '1',
        alternativePendingEmail: 'pending@example.com',
        alternativeEmailVerified: false,
      });

      const result = await service.resendAlternativeVerificationCode('1');
      expect(result.success).toBe(true);
      expect(mockEmailService.sendVerificationEmail).toHaveBeenCalled();
    });
  });
});
