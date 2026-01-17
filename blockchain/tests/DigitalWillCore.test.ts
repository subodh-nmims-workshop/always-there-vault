import { expect } from "chai";
import { ethers } from "hardhat";
import { DigitalWillCore, HeartbeatTracker } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("DigitalWillCore", function () {
  let digitalWillCore: DigitalWillCore;
  let heartbeatTracker: HeartbeatTracker;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let beneficiary1: SignerWithAddress;
  let beneficiary2: SignerWithAddress;

  const HEARTBEAT_INTERVAL = 30 * 24 * 60 * 60; // 30 days
  const GRACE_PERIOD = 14 * 24 * 60 * 60; // 14 days

  beforeEach(async function () {
    [owner, user1, beneficiary1, beneficiary2] = await ethers.getSigners();

    // Deploy HeartbeatTracker
    const HeartbeatTrackerFactory = await ethers.getContractFactory("HeartbeatTracker");
    heartbeatTracker = await HeartbeatTrackerFactory.deploy();
    await heartbeatTracker.waitForDeployment();

    // Deploy DigitalWillCore
    const DigitalWillCoreFactory = await ethers.getContractFactory("DigitalWillCore");
    digitalWillCore = await DigitalWillCoreFactory.deploy(await heartbeatTracker.getAddress());
    await digitalWillCore.waitForDeployment();
  });

  describe("User Registration", function () {
    it("Should register a new user", async function () {
      await digitalWillCore.connect(user1).registerUser(HEARTBEAT_INTERVAL, GRACE_PERIOD);
      
      const userConfig = await digitalWillCore.getUserConfig(user1.address);
      expect(userConfig.isRegistered).to.be.true;
      expect(userConfig.heartbeatInterval).to.equal(HEARTBEAT_INTERVAL);
      expect(userConfig.gracePeriod).to.equal(GRACE_PERIOD);
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
      await digitalWillCore.connect(user1).recordHeartbeat();
      
      const userConfig = await digitalWillCore.getUserConfig(user1.address);
      expect(userConfig.lastHeartbeat).to.be.gt(0);
    });

    it("Should update last heartbeat timestamp", async function () {
      await digitalWillCore.connect(user1).recordHeartbeat();
      const firstHeartbeat = (await digitalWillCore.getUserConfig(user1.address)).lastHeartbeat;
      
      // Wait a bit
      await ethers.provider.send("evm_increaseTime", [60]);
      await ethers.provider.send("evm_mine", []);
      
      await digitalWillCore.connect(user1).recordHeartbeat();
      const secondHeartbeat = (await digitalWillCore.getUserConfig(user1.address)).lastHeartbeat;
      
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
      await digitalWillCore.connect(user1).registerAsset(ipfsHash, keyShares);
      
      const assetCount = await digitalWillCore.getAssetCount(user1.address);
      expect(assetCount).to.equal(1);
    });

    it("Should store asset metadata correctly", async function () {
      await digitalWillCore.connect(user1).registerAsset(ipfsHash, keyShares);
      
      const asset = await digitalWillCore.getAsset(user1.address, 0);
      expect(asset.ipfsHash).to.equal(ipfsHash);
      expect(asset.owner).to.equal(user1.address);
      expect(asset.isReleased).to.be.false;
    });

    it("Should require exactly 5 key shares", async function () {
      const invalidShares = [
        ethers.keccak256(ethers.toUtf8Bytes("share1")),
        ethers.keccak256(ethers.toUtf8Bytes("share2")),
      ];
      
      await expect(
        digitalWillCore.connect(user1).registerAsset(ipfsHash, invalidShares)
      ).to.be.revertedWith("Must provide exactly 5 key shares");
    });
  });

  describe("Beneficiary Management", function () {
    beforeEach(async function () {
      await digitalWillCore.connect(user1).registerUser(HEARTBEAT_INTERVAL, GRACE_PERIOD);
    });

    it("Should add a beneficiary", async function () {
      await digitalWillCore.connect(user1).addBeneficiary(beneficiary1.address);
      
      const beneficiaries = await digitalWillCore.getBeneficiaries(user1.address);
      expect(beneficiaries).to.include(beneficiary1.address);
    });

    it("Should add multiple beneficiaries", async function () {
      await digitalWillCore.connect(user1).addBeneficiary(beneficiary1.address);
      await digitalWillCore.connect(user1).addBeneficiary(beneficiary2.address);
      
      const beneficiaries = await digitalWillCore.getBeneficiaries(user1.address);
      expect(beneficiaries).to.have.lengthOf(2);
      expect(beneficiaries).to.include(beneficiary1.address);
      expect(beneficiaries).to.include(beneficiary2.address);
    });

    it("Should not allow duplicate beneficiaries", async function () {
      await digitalWillCore.connect(user1).addBeneficiary(beneficiary1.address);
      
      await expect(
        digitalWillCore.connect(user1).addBeneficiary(beneficiary1.address)
      ).to.be.revertedWith("Beneficiary already exists");
    });

    it("Should remove a beneficiary", async function () {
      await digitalWillCore.connect(user1).addBeneficiary(beneficiary1.address);
      await digitalWillCore.connect(user1).removeBeneficiary(beneficiary1.address);
      
      const beneficiaries = await digitalWillCore.getBeneficiaries(user1.address);
      expect(beneficiaries).to.not.include(beneficiary1.address);
    });
  });

  describe("Asset Release", function () {
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
      await digitalWillCore.connect(user1).addBeneficiary(beneficiary1.address);
      await digitalWillCore.connect(user1).registerAsset(ipfsHash, keyShares);
    });

    it("Should not release asset before deadline", async function () {
      await expect(
        digitalWillCore.connect(beneficiary1).claimAsset(user1.address, 0)
      ).to.be.revertedWith("Asset not yet releasable");
    });

    it("Should release asset after deadline", async function () {
      // Fast forward time past heartbeat interval + grace period
      await ethers.provider.send("evm_increaseTime", [HEARTBEAT_INTERVAL + GRACE_PERIOD + 1]);
      await ethers.provider.send("evm_mine", []);
      
      await digitalWillCore.connect(beneficiary1).claimAsset(user1.address, 0);
      
      const asset = await digitalWillCore.getAsset(user1.address, 0);
      expect(asset.isReleased).to.be.true;
    });

    it("Should only allow beneficiaries to claim", async function () {
      await ethers.provider.send("evm_increaseTime", [HEARTBEAT_INTERVAL + GRACE_PERIOD + 1]);
      await ethers.provider.send("evm_mine", []);
      
      await expect(
        digitalWillCore.connect(beneficiary2).claimAsset(user1.address, 0)
      ).to.be.revertedWith("Not a beneficiary");
    });
  });

  describe("Emergency Override", function () {
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
      await digitalWillCore.connect(user1).registerAsset(ipfsHash, keyShares);
    });

    it("Should allow owner to revoke asset", async function () {
      await digitalWillCore.connect(user1).revokeAsset(0);
      
      const asset = await digitalWillCore.getAsset(user1.address, 0);
      expect(asset.isRevoked).to.be.true;
    });

    it("Should not allow claiming revoked asset", async function () {
      await digitalWillCore.connect(user1).addBeneficiary(beneficiary1.address);
      await digitalWillCore.connect(user1).revokeAsset(0);
      
      await ethers.provider.send("evm_increaseTime", [HEARTBEAT_INTERVAL + GRACE_PERIOD + 1]);
      await ethers.provider.send("evm_mine", []);
      
      await expect(
        digitalWillCore.connect(beneficiary1).claimAsset(user1.address, 0)
      ).to.be.revertedWith("Asset is revoked");
    });
  });
});
