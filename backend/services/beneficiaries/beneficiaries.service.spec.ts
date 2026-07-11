import { Test, TestingModule } from '@nestjs/testing';
import { BeneficiariesService } from './beneficiaries.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('BeneficiariesService - IDOR Protections', () => {
  let service: BeneficiariesService;
  let mockDb: any;
  let mockUsersService: any;
  let mockEmailService: any;

  beforeEach(async () => {
    mockDb = {
      update: jest.fn().mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([{ id: 'ben-1', userId: 'user-1', name: 'Nominee' }])
          })
        })
      }),
      delete: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue(true)
      }),
      insert: jest.fn().mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ id: 'ben-1', userId: 'user-1' }])
        })
      }),
      query: {
        beneficiaries: {
          findFirst: jest.fn(),
          findMany: jest.fn(),
        },
      },
    };

    mockUsersService = {
      findUserByWallet: jest.fn().mockResolvedValue({ id: 'user-1', name: 'User 1' }),
      findUserById: jest.fn().mockResolvedValue({ id: 'user-1', name: 'User 1' }),
    };

    mockEmailService = {
      sendBeneficiaryAddedEmail: jest.fn().mockResolvedValue(true),
      sendBeneficiaryVerificationEmail: jest.fn().mockResolvedValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BeneficiariesService,
        {
          provide: 'DRIZZLE_DB',
          useValue: mockDb,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
      ],
    }).compile();

    service = module.get<BeneficiariesService>(BeneficiariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBeneficiaryForUser', () => {
    it('should return beneficiary if it belongs to the requesting user', async () => {
      mockDb.query.beneficiaries.findFirst.mockResolvedValue({ id: 'ben-1', userId: 'user-1' });

      const result = await service.getBeneficiaryForUser('ben-1', 'user-1');
      expect(result).toBeDefined();
      expect(result.id).toBe('ben-1');
      expect(result.userId).toBe('user-1');
    });

    it('should throw NotFoundException if beneficiary does not belong to the user', async () => {
      mockDb.query.beneficiaries.findFirst.mockResolvedValue(null);

      await expect(service.getBeneficiaryForUser('ben-1', 'user-2')).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('updateBeneficiaryForUser', () => {
    it('should successfully update if beneficiary belongs to the user', async () => {
      mockDb.query.beneficiaries.findFirst.mockResolvedValue({ id: 'ben-1', userId: 'user-1' });

      const result = await service.updateBeneficiaryForUser('ben-1', { name: 'Updated Nominee' }, 'user-1');
      expect(result).toBeDefined();
      expect(mockDb.update).toHaveBeenCalled();
    });

    it('should throw NotFoundException on update if beneficiary belongs to another user', async () => {
      mockDb.query.beneficiaries.findFirst.mockResolvedValue(null);

      await expect(
        service.updateBeneficiaryForUser('ben-1', { name: 'Updated Nominee' }, 'user-2')
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteBeneficiaryForUser', () => {
    it('should delete beneficiary if ownership is verified', async () => {
      mockDb.query.beneficiaries.findFirst.mockResolvedValue({ id: 'ben-1', userId: 'user-1' });

      await service.deleteBeneficiaryForUser('ben-1', 'user-1');
      expect(mockDb.delete).toHaveBeenCalled();
    });

    it('should block deletion if beneficiary belongs to another user', async () => {
      mockDb.query.beneficiaries.findFirst.mockResolvedValue(null);

      await expect(service.deleteBeneficiaryForUser('ben-1', 'user-2')).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
