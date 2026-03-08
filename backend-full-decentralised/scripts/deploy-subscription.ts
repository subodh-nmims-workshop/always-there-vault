import { ethers } from 'hardhat';

async function main() {
  console.log('🚀 Deploying SubscriptionManager contract...');

  const [deployer] = await ethers.getSigners();
  console.log('Deploying with account:', deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('Account balance:', ethers.formatEther(balance), 'ETH');

  // Deploy SubscriptionManager
  const SubscriptionManager = await ethers.getContractFactory('SubscriptionManager');
  const subscriptionManager = await SubscriptionManager.deploy();
  await subscriptionManager.waitForDeployment();

  const address = await subscriptionManager.getAddress();
  console.log('✅ SubscriptionManager deployed to:', address);

  // Add USDC as supported payment token (example addresses)
  // Polygon Mumbai USDC: 0x0FA8781a83E46826621b3BC094Ea2A0212e71B23
  // Polygon Mainnet USDC: 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
  
  const USDC_ADDRESS = '0x0FA8781a83E46826621b3BC094Ea2A0212e71B23'; // Mumbai testnet
  
  console.log('Adding USDC as supported payment token...');
  const tx = await subscriptionManager.addSupportedToken(USDC_ADDRESS);
  await tx.wait();
  console.log('✅ USDC added as payment token');

  // Get plan details
  console.log('\n📋 Plan Details:');
  const freedom = await subscriptionManager.plans(0);
  const sovereign = await subscriptionManager.plans(1);
  const immortal = await subscriptionManager.plans(2);

  console.log('Freedom Plan:', {
    name: freedom.name,
    pricePerMonth: ethers.formatUnits(freedom.pricePerMonth, 6),
    pricePerYear: ethers.formatUnits(freedom.pricePerYear, 6),
  });

  console.log('Sovereign Plan:', {
    name: sovereign.name,
    pricePerMonth: ethers.formatUnits(sovereign.pricePerMonth, 6),
    pricePerYear: ethers.formatUnits(sovereign.pricePerYear, 6),
  });

  console.log('Immortal Plan:', {
    name: immortal.name,
    pricePerMonth: ethers.formatUnits(immortal.pricePerMonth, 6),
    pricePerYear: ethers.formatUnits(immortal.pricePerYear, 6),
  });

  console.log('\n🎉 Deployment complete!');
  console.log('Contract address:', address);
  console.log('\nAdd this to your .env file:');
  console.log(`SUBSCRIPTION_CONTRACT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
