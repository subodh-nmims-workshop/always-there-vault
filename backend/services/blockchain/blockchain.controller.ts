import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BlockchainService } from './blockchain.service';

@ApiTags('blockchain')
@Controller('api/blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('contract-info')
  @ApiOperation({ summary: 'Get smart contract information' })
  @ApiResponse({ status: 200, description: 'Contract info retrieved successfully' })
  async getContractInfo() {
    return this.blockchainService.getContractInfo();
  }

  @Get('user/:walletAddress')
  @ApiOperation({ summary: 'Get user blockchain data' })
  @ApiResponse({ status: 200, description: 'User data retrieved successfully' })
  async getUserData(@Param('walletAddress') walletAddress: string) {
    return this.blockchainService.getUserData(walletAddress);
  }

  @Post('verify-signature')
  @ApiOperation({ summary: 'Verify wallet signature' })
  @ApiResponse({ status: 200, description: 'Signature verified successfully' })
  async verifySignature(
    @Body() body: { message: string; signature: string; address: string },
  ) {
    return this.blockchainService.verifySignature(body.message, body.signature, body.address);
  }

  @Get('gas-estimate/:operation')
  @ApiOperation({ summary: 'Estimate gas for operation' })
  @ApiResponse({ status: 200, description: 'Gas estimate retrieved successfully' })
  async estimateGas(@Param('operation') operation: string) {
    return this.blockchainService.estimateGas(operation);
  }
}
