import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Utility script to manage funds in the SubscriptionManager contract.
 * Use this to withdraw USDC/ETH or transfer ownership to a new account.
 */
async function manageFunds() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY!, provider);
    
    const contractAddress = process.env.SUBSCRIPTION_CONTRACT_ADDRESS!;
    const abi = [
        'function withdraw(address token, uint256 amount) external',
        'function transferOwnership(address newOwner) external',
        'function owner() view returns (address)',
    ];

    const contract = new ethers.Contract(contractAddress, abi, wallet);

    console.log('--- Subscription Manager Fund Management ---');
    console.log(`Contract Address: ${contractAddress}`);
    console.log(`Current Owner: ${await contract.owner()}`);
    console.log(`Your Wallet: ${wallet.address}`);

    // EXAMPLE: Withdraw 100 USDC (assuming 6 decimals)
    // const usdcAddress = "0x..."; 
    // const amount = ethers.parseUnits("100", 6);
    // const tx = await contract.withdraw(usdcAddress, amount);
    // await tx.wait();
    // console.log(`Successfully withdrawn ${amount} to ${wallet.address}`);

    // EXAMPLE: Withdraw ETH
    // const ethAmount = ethers.parseEther("0.1");
    // const tx = await contract.withdraw("0x0000000000000000000000000000000000000000", ethAmount);
    // await tx.wait();

    console.log('Action needed: Uncomment the example code in scripts/manage-funds.ts to perform a withdrawal.');
}

manageFunds().catch(console.error);
