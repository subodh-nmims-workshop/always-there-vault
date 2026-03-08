import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("🚀 Deploying DeadMan Protocol Contracts...\n");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "MATIC\n");

  // Deploy HeartbeatTracker
  console.log("📦 Deploying HeartbeatTracker...");
  const HeartbeatTracker = await ethers.getContractFactory("HeartbeatTracker");
  const heartbeatTracker = await HeartbeatTracker.deploy();
  await heartbeatTracker.waitForDeployment();
  const heartbeatAddress = await heartbeatTracker.getAddress();
  console.log("✅ HeartbeatTracker deployed to:", heartbeatAddress);

  // Deploy DigitalWill
  console.log("\n📦 Deploying DigitalWill...");
  const DigitalWill = await ethers.getContractFactory("DigitalWill");
  const digitalWill = await DigitalWill.deploy();
  await digitalWill.waitForDeployment();
  const digitalWillAddress = await digitalWill.getAddress();
  console.log("✅ DigitalWill deployed to:", digitalWillAddress);

  // Deploy AssetManager
  console.log("\n📦 Deploying AssetManager...");
  const AssetManager = await ethers.getContractFactory("AssetManager");
  const assetManager = await AssetManager.deploy();
  await assetManager.waitForDeployment();
  const assetManagerAddress = await assetManager.getAddress();
  console.log("✅ AssetManager deployed to:", assetManagerAddress);

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("🎉 DEPLOYMENT COMPLETE!");
  console.log("=".repeat(60));
  console.log("\n📋 Contract Addresses:");
  console.log("   HeartbeatTracker:", heartbeatAddress);
  console.log("   DigitalWill:     ", digitalWillAddress);
  console.log("   AssetManager:    ", assetManagerAddress);

  console.log("\n📝 Next Steps:");
  console.log("   1. Update frontend/web/src/config/contracts.ts with these addresses");
  console.log("   2. Copy ABIs from artifacts/ to frontend/web/src/contracts/");
  console.log("   3. Verify contracts on PolygonScan (optional)");

  console.log("\n🔍 Verify Commands:");
  console.log(`   npx hardhat verify --network mumbai ${heartbeatAddress}`);
  console.log(`   npx hardhat verify --network mumbai ${digitalWillAddress}`);
  console.log(`   npx hardhat verify --network mumbai ${assetManagerAddress}`);

  console.log("\n💾 Save these addresses to .env:");
  console.log(`   NEXT_PUBLIC_HEARTBEAT_CONTRACT=${heartbeatAddress}`);
  console.log(`   NEXT_PUBLIC_DIGITAL_WILL_CONTRACT=${digitalWillAddress}`);
  console.log(`   NEXT_PUBLIC_ASSET_MANAGER_CONTRACT=${assetManagerAddress}`);

  // Automate the environment variable update securely!
  try {
    const envPath = path.resolve(__dirname, "../../frontend/web/.env.local");
    if (fs.existsSync(envPath)) {
      console.log(`\n🤖 Auto-updating frontend environment at ${envPath}...`);
      let envContent = fs.readFileSync(envPath, "utf-8");

      const isLocalhost = (await ethers.provider.getNetwork()).chainId === 31337n;

      const updates: Record<string, string> = {
        NEXT_PUBLIC_HEARTBEAT_CONTRACT: heartbeatAddress,
        NEXT_PUBLIC_DIGITAL_WILL_CONTRACT: digitalWillAddress,
        NEXT_PUBLIC_ASSET_MANAGER_CONTRACT: assetManagerAddress,
      };

      if (isLocalhost) {
        updates.NEXT_PUBLIC_NETWORK = "localhost";
        updates.NEXT_PUBLIC_CHAIN_ID = "31337";
        updates.NEXT_PUBLIC_RPC_URL = "http://127.0.0.1:8545";
        console.log("   --> Detected Localhost deployment. Configuring local network parameters.");
      }

      for (const [key, value] of Object.entries(updates)) {
        const regex = new RegExp(`^${key}=.*$`, "m");
        if (regex.test(envContent)) {
          envContent = envContent.replace(regex, `${key}=${value}`);
        } else {
          envContent += `\n${key}=${value}`;
        }
      }

      fs.writeFileSync(envPath, envContent);
      console.log("✅ Auto-update complete!");
    } else {
      console.log(`\n⚠️  Could not find ${envPath} to auto-update. Please update manually.`);
    }
  } catch (err) {
    console.log(`\n⚠️  Failed to auto-update .env.local:`, err);
  }

  console.log("\n✨ Done! Your backend is now 100% decentralized!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
