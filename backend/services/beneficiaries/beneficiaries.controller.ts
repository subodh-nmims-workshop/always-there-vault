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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BeneficiariesService } from './beneficiaries.service';
import { CreateBeneficiaryDto, UpdateBeneficiaryDto, BeneficiaryDto } from './dto/beneficiary.dto';

@ApiTags('beneficiaries')
@Controller('api/beneficiaries')
export class BeneficiariesController {
  constructor(private readonly beneficiariesService: BeneficiariesService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new beneficiary' })
  @ApiResponse({ status: 201, description: 'Beneficiary created successfully' })
  async createBeneficiary(@Body() createBeneficiaryDto: CreateBeneficiaryDto): Promise<BeneficiaryDto> {
    return this.beneficiariesService.createBeneficiary(createBeneficiaryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all beneficiaries for a user' })
  @ApiResponse({ status: 200, description: 'Beneficiaries retrieved successfully' })
  async getAllBeneficiaries(@Query('ownerAddress') ownerAddress: string): Promise<BeneficiaryDto[]> {
    return this.beneficiariesService.getAllBeneficiaries(ownerAddress);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific beneficiary' })
  @ApiResponse({ status: 200, description: 'Beneficiary retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Beneficiary not found' })
  async getBeneficiary(@Param('id') id: string): Promise<BeneficiaryDto> {
    return this.beneficiariesService.getBeneficiary(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update beneficiary information' })
  @ApiResponse({ status: 200, description: 'Beneficiary updated successfully' })
  async updateBeneficiary(
    @Param('id') id: string,
    @Body() updateBeneficiaryDto: UpdateBeneficiaryDto,
  ): Promise<BeneficiaryDto> {
    return this.beneficiariesService.updateBeneficiary(id, updateBeneficiaryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a beneficiary' })
  @ApiResponse({ status: 204, description: 'Beneficiary deleted successfully' })
  async deleteBeneficiary(@Param('id') id: string): Promise<void> {
    return this.beneficiariesService.deleteBeneficiary(id);
  }
}
