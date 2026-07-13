import { expect } from "chai";
import { ethers } from "hardhat";
import { DigitalWillCore, GuardianRecovery } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("DigitalWillCore & GuardianRecovery", function () {
  let digitalWillCore: DigitalWillCore;
  let recovery: GuardianRecovery;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let beneficiary1: SignerWithAddress;
  let beneficiary2: SignerWithAddress;
  let guardian1: SignerWithAddress;
  let guardian2: SignerWithAddress;
  let guardian3: SignerWithAddress;
  let newOwner: SignerWithAddress;

  const HEARTBEAT_INTERVAL = 7 * 24 * 60 * 60; // 7 days (min interval)
  const GRACE_PERIOD = 7 * 24 * 60 * 60; // 7 days (min grace period)

  beforeEach(async function () {
    [owner, user1, beneficiary1, beneficiary2, guardian1, guardian2, guardian3, newOwner] = await ethers.getSigners();

    // Deploy DigitalWillCore
    const DigitalWillCoreFactory = await ethers.getContractFactory("DigitalWillCore");
    digitalWillCore = await DigitalWillCoreFactory.deploy();
    await digitalWillCore.waitForDeployment();

    // Deploy GuardianRecovery
    const GuardianRecoveryFactory = await ethers.getContractFactory("GuardianRecovery");
    recovery = await GuardianRecoveryFactory.deploy();
    await recovery.waitForDeployment();

    // Link them
    await recovery.setDigitalWillCore(await digitalWillCore.getAddress());
    await digitalWillCore.setGuardianRecovery(await recovery.getAddress());
  });

  describe("User Registration", function () {
    it("Should register a new user", async function () {
      await digitalWillCore.connect(user1).registerUser(HEARTBEAT_INTERVAL, GRACE_PERIOD);
      
      const status = await digitalWillCore.getUserStatus(user1.address);
      expect(status.exists).to.be.true;
      expect(status.heartbeatInterval).to.equal(HEARTBEAT_INTERVAL);
      expect(status.gracePeriod).to.equal(GRACE_PERIOD);
    });

    it("Should not allow duplicate registration", async function () {
      await digitalWillCore.connect(user1).registerUser(HEARTBEAT_INTERVAL, GRACE_PERIOD);
      
      await expect(
        digitalWillCore.connect(user1).registerUser(HEARTBEAT_INTERVAL, GRACE_PERIOD)
      ).to.be.revertedWith("User already registered");
    });

    it("Should validate heartbeat interval", async function () {
      await expect(
        digitalWillCore.connect(user1).registerUser(0, GRACE_PERIOD)
      ).to.be.revertedWith("Invalid heartbeat interval");
    });
  });

  describe("Heartbeat Recording", function () {
    beforeEach(async function () {
      await digitalWillCore.connect(user1).registerUser(HEARTBEAT_INTERVAL, GRACE_PERIOD);
    });

    it("Should record a heartbeat", async function () {
      await digitalWillCore.connect(user1).recordHeartbeat("manual", "0x");
      
      const status = await digitalWillCore.getUserStatus(user1.address);
      expect(status.lastHeartbeat).to.be.gt(0);
    });

    it("Should update last heartbeat timestamp", async function () {
      await digitalWillCore.connect(user1).recordHeartbeat("manual", "0x");
      const firstHeartbeat = (await digitalWillCore.getUserStatus(user1.address)).lastHeartbeat;
      
      // Wait a bit
      await ethers.provider.send("evm_increaseTime", [60]);
      await ethers.provider.send("evm_mine", []);
      
      await digitalWillCore.connect(user1).recordHeartbeat("manual", "0x");
      const secondHeartbeat = (await digitalWillCore.getUserStatus(user1.address)).lastHeartbeat;
      
      expect(secondHeartbeat).to.be.gt(firstHeartbeat);
    });
  });

  describe("Asset Registration", function () {
    const ipfsHash = "QmExampleHash123456789";
    const keyShares = [
      ethers.keccak256(ethers.toUtf8Bytes("share1")),
      ethers.keccak256(ethers.toUtf8Bytes("share2")),
      ethers.keccak256(ethers.toUtf8Bytes("share3")),
      ethers.keccak256(ethers.toUtf8Bytes("share4")),
      ethers.keccak256(ethers.toUtf8Bytes("share5")),
    ];

    beforeEach(async function () {
      await digitalWillCore.connect(user1).registerUser(HEARTBEAT_INTERVAL, GRACE_PERIOD);
    });

    it("Should register an asset", async function () {
      await digitalWillCore.connect(user1).registerAsset("asset1", ipfsHash, keyShares);
      
      const assetCount = await digitalWillCore.getUserAssetCount(user1.address);
      expect(assetCount).to.equal(1);
    });

    it("Should store asset metadata correctly", async function () {
      await digitalWillCore.connect(user1).registerAsset("asset1", ipfsHash, keyShares);
      
      const asset = await digitalWillCore.assets(user1.address, "asset1");
      expect(asset.ipfsHash).to.equal(ipfsHash);
      expect(asset.exists).to.be.true;
    });

    it("Should require exactly 5 key shares", async function () {
      const invalidShares = [
        ethers.keccak256(ethers.toUtf8Bytes("share1")),
        ethers.keccak256(ethers.toUtf8Bytes("share2")),
      ];
      
      await expect(
        digitalWillCore.connect(user1).registerAsset("asset1", ipfsHash, invalidShares)
      ).to.be.revertedWith("Must have exactly 5 key shares");
    });
  });

  describe("Beneficiary Management & Release", function () {
    const ipfsHash = "QmExampleHash123456789";
    const keyShares = [
      ethers.keccak256(ethers.toUtf8Bytes("share1")),
      ethers.keccak256(ethers.toUtf8Bytes("share2")),
      ethers.keccak256(ethers.toUtf8Bytes("share3")),
      ethers.keccak256(ethers.toUtf8Bytes("share4")),
      ethers.keccak256(ethers.toUtf8Bytes("share5")),
    ];

    beforeEach(async function () {
      await digitalWillCore.connect(user1).registerUser(HEARTBEAT_INTERVAL, GRACE_PERIOD);
      await digitalWillCore.connect(user1).registerAsset("asset1", ipfsHash, keyShares);
    });

    it("Should add a beneficiary rule", async function () {
      await digitalWillCore.connect(user1).addBeneficiaryRule("asset1", beneficiary1.address, 0);
      
      const rulesCount = await digitalWillCore.getAssetRulesCount(user1.address, "asset1");
      expect(rulesCount).to.equal(1);
      
      const rule = await digitalWillCore.getAssetRule(user1.address, "asset1", 0);
      expect(rule.beneficiary).to.equal(beneficiary1.address);
      expect(rule.releaseDelay).to.equal(0);
      expect(rule.enabled).to.be.true;
    });

    it("Should release asset after trigger condition and release delay", async function () {
      await digitalWillCore.connect(user1).addBeneficiaryRule("asset1", beneficiary1.address, 3600); // 1 hour delay
      
      // Initially not eligible
      let [eligible] = await digitalWillCore.isAssetEligibleForRelease(user1.address, "asset1", 0);
      expect(eligible).to.be.false;

      // Fast forward past heartbeat + grace period
      await ethers.provider.send("evm_increaseTime", [HEARTBEAT_INTERVAL + GRACE_PERIOD + 1]);
      await ethers.provider.send("evm_mine", []);

      // Trigger the system
      await digitalWillCore.triggerSystem(user1.address);

      // Still not eligible because of 1 hour release delay
      [eligible] = await digitalWillCore.isAssetEligibleForRelease(user1.address, "asset1", 0);
      expect(eligible).to.be.false;

      // Fast forward 1 hour
      await ethers.provider.send("evm_increaseTime", [3601]);
      await ethers.provider.send("evm_mine", []);

      // Now eligible
      [eligible] = await digitalWillCore.isAssetEligibleForRelease(user1.address, "asset1", 0);
      expect(eligible).to.be.true;

      // Claim asset
      await digitalWillCore.connect(beneficiary1).releaseAsset(user1.address, "asset1", 0);
      const rule = await digitalWillCore.getAssetRule(user1.address, "asset1", 0);
      expect(rule.released).to.be.true;
    });

    it("Should not release asset if emergency override is enabled", async function () {
      await digitalWillCore.connect(user1).addBeneficiaryRule("asset1", beneficiary1.address, 0);

      // Fast forward past heartbeat + grace period
      await ethers.provider.send("evm_increaseTime", [HEARTBEAT_INTERVAL + GRACE_PERIOD + 1]);
      await ethers.provider.send("evm_mine", []);

      // Enable emergency override
      await digitalWillCore.connect(user1).enableEmergencyOverride("False alarm");

      // Attempt to trigger should fail
      await expect(
        digitalWillCore.triggerSystem(user1.address)
      ).to.be.revertedWith("Emergency override active");
    });
  });

  describe("Social Recovery Ownership Migration", function () {
    const ipfsHash = "QmExampleHash123456789";
    const keyShares = [
      ethers.keccak256(ethers.toUtf8Bytes("share1")),
      ethers.keccak256(ethers.toUtf8Bytes("share2")),
      ethers.keccak256(ethers.toUtf8Bytes("share3")),
      ethers.keccak256(ethers.toUtf8Bytes("share4")),
      ethers.keccak256(ethers.toUtf8Bytes("share5")),
    ];

    beforeEach(async function () {
      // Setup user1 with guardians
      await recovery.connect(user1).addGuardian(guardian1.address);
      await recovery.connect(user1).addGuardian(guardian2.address);
      await recovery.connect(user1).addGuardian(guardian3.address);

      // Register user1 config and asset
      await digitalWillCore.connect(user1).registerUser(HEARTBEAT_INTERVAL, GRACE_PERIOD);
      await digitalWillCore.connect(user1).registerAsset("asset1", ipfsHash, keyShares);
      await digitalWillCore.connect(user1).addBeneficiaryRule("asset1", beneficiary1.address, 0);
    });

    it("Should migrate vault state to newOwner on successful recovery execution", async function () {
      // Initiate and approve recovery
      await recovery.connect(guardian1).initiateRecovery(user1.address, newOwner.address);
      await recovery.connect(guardian2).approveRecovery(user1.address);
      await recovery.connect(guardian3).approveRecovery(user1.address);

      // Fast forward 7 days recovery delay
      await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60 + 1]);
      await ethers.provider.send("evm_mine", []);

      // Execute recovery
      await recovery.executeRecovery(user1.address);

      // Verify that old owner status is deleted and new owner status exists
      const oldOwnerStatus = await digitalWillCore.getUserStatus(user1.address);
      expect(oldOwnerStatus.exists).to.be.false;

      const newOwnerStatus = await digitalWillCore.getUserStatus(newOwner.address);
      expect(newOwnerStatus.exists).to.be.true;
      expect(newOwnerStatus.heartbeatInterval).to.equal(HEARTBEAT_INTERVAL);

      // Verify that the assets and rules are migrated to the new owner
      const assetCount = await digitalWillCore.getUserAssetCount(newOwner.address);
      expect(assetCount).to.equal(1);

      const asset = await digitalWillCore.assets(newOwner.address, "asset1");
      expect(asset.ipfsHash).to.equal(ipfsHash);
      expect(asset.exists).to.be.true;

      const rule = await digitalWillCore.getAssetRule(newOwner.address, "asset1", 0);
      expect(rule.beneficiary).to.equal(beneficiary1.address);
      expect(rule.enabled).to.be.true;
    });
  });
});
