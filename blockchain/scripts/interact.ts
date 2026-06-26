import { ethers } from "hardhat";

async function main() {
  console.log("🔗 Interacting with AlwaysThere Vault contracts...\n");

  // Get signer
  const [signer] = await ethers.getSigners();
  console.log("Using account:", signer.address);

  // Contract addresses (update these after deployment)
  const HEARTBEAT_TRACKER_ADDRESS = process.env.HEARTBEAT_TRACKER_ADDRESS || "";
  const DIGITAL_WILL_CORE_ADDRESS = process.env.DIGITAL_WILL_CORE_ADDRESS || "";

  if (!HEARTBEAT_TRACKER_ADDRESS || !DIGITAL_WILL_CORE_ADDRESS) {
    console.error("❌ Please set contract addresses in environment variables");
    process.exit(1);
  }

  // Get contract instances
  const heartbeatTracker = await ethers.getContractAt("HeartbeatTracker", HEARTBEAT_TRACKER_ADDRESS);
  const digitalWillCore = await ethers.getContractAt("DigitalWillCore", DIGITAL_WILL_CORE_ADDRESS);

  console.log("\n📊 Current Status:");
  
  // Check if user is registered
  try {
    const userConfig = await digitalWillCore.getUserConfig(signer.address);
    console.log("User registered:", userConfig.isRegistered);
    console.log("Heartbeat interval:", userConfig.heartbeatInterval.toString(), "seconds");
    console.log("Grace period:", userConfig.gracePeriod.toString(), "seconds");
  } catch (error) {
    console.log("User not registered yet");
  }

  // Example: Register user
  console.log("\n📝 Registering user...");
  try {
    const tx = await digitalWillCore.registerUser(
      30 * 24 * 60 * 60, // 30 days heartbeat interval
      14 * 24 * 60 * 60  // 14 days grace period
    );
    await tx.wait();
    console.log("✅ User registered successfully");
  } catch (error: any) {
    if (error.message.includes("already registered")) {
      console.log("ℹ️  User already registered");
    } else {
      console.error("❌ Registration failed:", error.message);
    }
  }

  // Example: Record heartbeat
  console.log("\n💓 Recording heartbeat...");
  try {
    const tx = await digitalWillCore.recordHeartbeat();
    await tx.wait();
    console.log("✅ Heartbeat recorded successfully");
  } catch (error: any) {
    console.error("❌ Heartbeat recording failed:", error.message);
  }

  // Example: Register asset
  console.log("\n📄 Registering asset...");
  try {
    const ipfsHash = "QmExampleHash123456789";
    const keyShares = [
      ethers.keccak256(ethers.toUtf8Bytes("share1")),
      ethers.keccak256(ethers.toUtf8Bytes("share2")),
      ethers.keccak256(ethers.toUtf8Bytes("share3")),
      ethers.keccak256(ethers.toUtf8Bytes("share4")),
      ethers.keccak256(ethers.toUtf8Bytes("share5")),
    ];
    
    const tx = await digitalWillCore.registerAsset(ipfsHash, keyShares);
    await tx.wait();
    console.log("✅ Asset registered successfully");
  } catch (error: any) {
    console.error("❌ Asset registration failed:", error.message);
  }

  // Get asset count
  try {
    const assetCount = await digitalWillCore.getAssetCount(signer.address);
    console.log("\n📊 Total assets:", assetCount.toString());
  } catch (error: any) {
    console.error("❌ Failed to get asset count:", error.message);
  }

  console.log("\n✨ Interaction completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Interaction failed:", error);
    process.exit(1);
  });
