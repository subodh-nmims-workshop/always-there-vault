import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting deployment of AlwaysThere Vault contracts...\n");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");

  // Deploy HeartbeatTracker
  console.log("📦 Deploying HeartbeatTracker...");
  const HeartbeatTracker = await ethers.getContractFactory("HeartbeatTracker");
  const heartbeatTracker = await HeartbeatTracker.deploy();
  await heartbeatTracker.waitForDeployment();
  const heartbeatAddress = await heartbeatTracker.getAddress();
  console.log("✅ HeartbeatTracker deployed to:", heartbeatAddress);

  // Deploy DigitalWillCore
  console.log("\n📦 Deploying DigitalWillCore...");
  const DigitalWillCore = await ethers.getContractFactory("DigitalWillCore");
  const digitalWillCore = await DigitalWillCore.deploy();
  await digitalWillCore.waitForDeployment();
  const coreAddress = await digitalWillCore.getAddress();
  console.log("✅ DigitalWillCore deployed to:", coreAddress);

  // Deploy GuardianRecovery
  console.log("\n📦 Deploying GuardianRecovery...");
  const GuardianRecovery = await ethers.getContractFactory("GuardianRecovery");
  const guardianRecovery = await GuardianRecovery.deploy();
  await guardianRecovery.waitForDeployment();
  const guardianRecoveryAddress = await guardianRecovery.getAddress();
  console.log("✅ GuardianRecovery deployed to:", guardianRecoveryAddress);

  // Link them
  console.log("\n🔗 Linking DigitalWillCore and GuardianRecovery...");
  await guardianRecovery.setDigitalWillCore(coreAddress);
  await digitalWillCore.setGuardianRecovery(guardianRecoveryAddress);
  console.log("✅ Linked successfully!");

  // Save deployment info
  const deploymentInfo = {
    network: (await ethers.provider.getNetwork()).name,
    chainId: (await ethers.provider.getNetwork()).chainId.toString(),
    deployer: deployer.address,
    contracts: {
      HeartbeatTracker: heartbeatAddress,
      DigitalWillCore: coreAddress,
      GuardianRecovery: guardianRecoveryAddress,
    },
    timestamp: new Date().toISOString(),
  };

  console.log("\n📄 Deployment Summary:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  console.log("\n✨ Deployment completed successfully!");
  console.log("\n📋 Next steps:");
  console.log("1. Update frontend/.env with contract addresses");
  console.log("2. Update backend/.env with contract addresses");
  console.log("3. Verify contracts on block explorer (if on testnet/mainnet)");
  console.log("4. Test contract interactions");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
