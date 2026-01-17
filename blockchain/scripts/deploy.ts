import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting deployment of Digital Will Protocol contracts...\n");

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
  const digitalWillCore = await DigitalWillCore.deploy(heartbeatAddress);
  await digitalWillCore.waitForDeployment();
  const coreAddress = await digitalWillCore.getAddress();
  console.log("✅ DigitalWillCore deployed to:", coreAddress);

  // Verify deployment
  console.log("\n🔍 Verifying deployment...");
  const owner = await digitalWillCore.owner();
  console.log("Contract owner:", owner);
  console.log("Deployer address:", deployer.address);
  console.log("Owner matches deployer:", owner === deployer.address);

  // Save deployment info
  const deploymentInfo = {
    network: (await ethers.provider.getNetwork()).name,
    chainId: (await ethers.provider.getNetwork()).chainId,
    deployer: deployer.address,
    contracts: {
      HeartbeatTracker: heartbeatAddress,
      DigitalWillCore: coreAddress,
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
