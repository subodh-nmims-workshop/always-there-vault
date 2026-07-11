import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BeneficiariesService } from './beneficiaries.service';
import { CreateBeneficiaryDto, UpdateBeneficiaryDto } from './dto/beneficiary.dto';
import { Beneficiary } from './schemas/beneficiary.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('beneficiaries')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/beneficiaries')
export class BeneficiariesController {
  constructor(private readonly beneficiariesService: BeneficiariesService) { }

  @Post()
  @ApiOperation({ summary: 'Add a new beneficiary' })
  @ApiResponse({ status: 201, description: 'Beneficiary created successfully' })
  async createBeneficiary(
    @Body() createBeneficiaryDto: CreateBeneficiaryDto,
    @Req() req: any,
  ): Promise<any> {
    // Prevent IDOR: Force beneficiary's owner address to be the authenticated caller's wallet
    const walletAddress = req.user.walletAddress;
    return this.beneficiariesService.createBeneficiary({
      ...createBeneficiaryDto,
      ownerAddress: walletAddress,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all beneficiaries for a user' })
  @ApiResponse({ status: 200, description: 'Beneficiaries retrieved successfully' })
  async getAllBeneficiaries(@Req() req: any): Promise<any[]> {
    // Prevent IDOR: Force retrieval based on the authenticated caller's wallet
    const walletAddress = req.user.walletAddress;
    return this.beneficiariesService.getAllBeneficiaries(walletAddress);
  }

  @Get('in-wills')
  @ApiOperation({ summary: 'Get all owners who designated this wallet as beneficiary' })
  @ApiResponse({ status: 200, description: 'Owners retrieved successfully' })
  async getOwnersByBeneficiary(@Req() req: any): Promise<any[]> {
    // Prevent IDOR: Force query wallet to be the authenticated caller's wallet
    const walletAddress = req.user.walletAddress;
    return this.beneficiariesService.findOwnersForBeneficiary(walletAddress);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific beneficiary' })
  @ApiResponse({ status: 200, description: 'Beneficiary retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Beneficiary not found' })
  async getBeneficiary(@Param('id') id: string, @Req() req: any): Promise<any> {
    const userId = req.user.userId;
    return this.beneficiariesService.getBeneficiaryForUser(id, userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update beneficiary information' })
  @ApiResponse({ status: 200, description: 'Beneficiary updated successfully' })
  async updateBeneficiary(
    @Param('id') id: string,
    @Body() updateBeneficiaryDto: UpdateBeneficiaryDto,
    @Req() req: any,
  ): Promise<any> {
    const userId = req.user.userId;
    return this.beneficiariesService.updateBeneficiaryForUser(id, updateBeneficiaryDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a beneficiary' })
  @ApiResponse({ status: 204, description: 'Beneficiary deleted successfully' })
  async deleteBeneficiary(@Param('id') id: string, @Req() req: any): Promise<void> {
    const userId = req.user.userId;
    return this.beneficiariesService.deleteBeneficiaryForUser(id, userId);
  }

  @Post(':id/send-verification')
  @ApiOperation({ summary: 'Send verification code to beneficiary email' })
  @ApiResponse({ status: 200, description: 'Verification email sent successfully' })
  async sendVerificationCode(@Param('id') id: string, @Req() req: any): Promise<any> {
    const userId = req.user.userId;
    return this.beneficiariesService.sendVerificationCodeForUser(id, userId);
  }

  @Post(':id/verify')
  @ApiOperation({ summary: 'Verify beneficiary with code' })
  @ApiResponse({ status: 200, description: 'Beneficiary verified successfully' })
  async verifyBeneficiary(
    @Param('id') id: string,
    @Body('code') code: string,
    @Req() req: any,
  ): Promise<any> {
    const userId = req.user.userId;
    return this.beneficiariesService.verifyBeneficiaryForUser(id, code, userId);
  }
}
