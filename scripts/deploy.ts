import { ethers } from 'hardhat';

async function main() {
  console.log('🚀 Starting Last Wish Protocol Deployment...');

  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error('❌ No deployer account found. Did you forget to add PRIVATE_KEY to your .env file?');
  }
  console.log('Deploying with account:', deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('Account balance:', ethers.formatEther(balance), 'ETH');

  // 1. Deploy SecureWill (Core Protocol)
  console.log('\nDeploying SecureWill...');
  const SecureWill = await ethers.getContractFactory('SecureWill');
  const secureWill = await SecureWill.deploy();
  await secureWill.waitForDeployment();
  const secureWillAddress = await secureWill.getAddress();
  console.log('✅ SecureWill deployed to:', secureWillAddress);

  // 2. Deploy SubscriptionManager
  console.log('\nDeploying SubscriptionManager...');
  const SubscriptionManager = await ethers.getContractFactory('SubscriptionManager');
  const subscriptionManager = await SubscriptionManager.deploy();
  await subscriptionManager.waitForDeployment();
  const subscriptionManagerAddress = await subscriptionManager.getAddress();
  console.log('✅ SubscriptionManager deployed to:', subscriptionManagerAddress);

  // 3. Optional: Deploy DigitalWill (Legacy/Advanced)
  console.log('\nDeploying DigitalWill...');
  const DigitalWill = await ethers.getContractFactory('DigitalWill');
  const digitalWill = await DigitalWill.deploy();
  await digitalWill.waitForDeployment();
  const digitalWillAddress = await digitalWill.getAddress();
  console.log('✅ DigitalWill deployed to:', digitalWillAddress);

  console.log('\n-----------------------------------------');
  console.log('🎉 ALL CONTRACTS DEPLOYED SUCCESSFULLY');
  console.log('-----------------------------------------');
  console.log(`CONTRACT_ADDRESS=${secureWillAddress}`);
  console.log(`DIGITAL_WILL_ADDRESS=${digitalWillAddress}`);
  console.log(`SUBSCRIPTION_CONTRACT_ADDRESS=${subscriptionManagerAddress}`);
  console.log('-----------------------------------------');
  console.log('Action: Update your backend/.env and root .env with these addresses.');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
