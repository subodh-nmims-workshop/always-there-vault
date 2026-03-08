import { expect } from "chai";
import { ethers } from "hardhat";
import { DigitalWill, HeartbeatTracker, AssetManager } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("DigitalWill", function () {
  let digitalWill: DigitalWill;
  let heartbeatTracker: HeartbeatTracker;
  let assetManager: AssetManager;
  let owner: SignerWithAddress;
  let beneficiary1: SignerWithAddress;
  let beneficiary2: SignerWithAddress;

  beforeEach(async function () {
    [owner, beneficiary1, beneficiary2] = await ethers.getSigners();

    // Deploy HeartbeatTracker
    const HeartbeatTrackerFactory = await ethers.getContractFactory("HeartbeatTracker");
    heartbeatTracker = await HeartbeatTrackerFactory.deploy();
    await heartbeatTracker.waitForDeployment();

    // Deploy AssetManager
    const AssetManagerFactory = await ethers.getContractFactory("AssetManager");
    assetManager = await AssetManagerFactory.deploy();
    await assetManager.waitForDeployment();

    // Deploy DigitalWill
    const DigitalWillFactory = await ethers.getContractFactory("DigitalWill");
    digitalWill = await DigitalWillFactory.deploy();
    await digitalWill.waitForDeployment();
  });

  describe("Will Creation", function () {
    it("Should create a new will", async function () {
      await digitalWill.createWill("ipfs://test-will-data");
      const will = await digitalWill.getWill(owner.address);
      expect(will.isActive).to.be.true;
      expect(will.ipfsCID).to.equal("ipfs://test-will-data");
    });

    it("Should not allow duplicate will creation", async function () {
      await digitalWill.createWill("ipfs://test-will-data");
      await expect(
        digitalWill.createWill("ipfs://test-will-data-2")
      ).to.be.revertedWith("Will already exists");
    });
  });

  describe("Beneficiary Management", function () {
    beforeEach(async function () {
      await digitalWill.createWill("ipfs://test-will-data");
    });

    it("Should add a beneficiary", async function () {
      await digitalWill.addBeneficiary(
        beneficiary1.address,
        "Beneficiary 1",
        "encrypted-share-1",
        50
      );
      expect(await digitalWill.isBeneficiary(owner.address, beneficiary1.address)).to.be.true;
    });

    it("Should add multiple beneficiaries", async function () {
      await digitalWill.addBeneficiary(beneficiary1.address, "Beneficiary 1", "share-1", 50);
      await digitalWill.addBeneficiary(beneficiary2.address, "Beneficiary 2", "share-2", 50);
      
      expect(await digitalWill.isBeneficiary(owner.address, beneficiary1.address)).to.be.true;
      expect(await digitalWill.isBeneficiary(owner.address, beneficiary2.address)).to.be.true;
    });

    it("Should not allow duplicate beneficiaries", async function () {
      await digitalWill.addBeneficiary(beneficiary1.address, "Beneficiary 1", "share-1", 50);
      await expect(
        digitalWill.addBeneficiary(beneficiary1.address, "Beneficiary 1", "share-1", 50)
      ).to.be.revertedWith("Beneficiary already exists");
    });

    it("Should remove a beneficiary", async function () {
      await digitalWill.addBeneficiary(beneficiary1.address, "Beneficiary 1", "share-1", 50);
      await digitalWill.removeBeneficiary(beneficiary1.address);
      
      expect(await digitalWill.isBeneficiary(owner.address, beneficiary1.address)).to.be.false;
    });

    it("Should get active beneficiaries count", async function () {
      await digitalWill.addBeneficiary(beneficiary1.address, "Beneficiary 1", "share-1", 50);
      await digitalWill.addBeneficiary(beneficiary2.address, "Beneficiary 2", "share-2", 50);
      
      const count = await digitalWill.getActiveBeneficiariesCount(owner.address);
      expect(count).to.equal(2);
    });
  });

  describe("Will Updates", function () {
    beforeEach(async function () {
      await digitalWill.createWill("ipfs://test-will-data");
    });

    it("Should update will data", async function () {
      await digitalWill.updateWill("ipfs://updated-will-data");
      const will = await digitalWill.getWill(owner.address);
      expect(will.ipfsCID).to.equal("ipfs://updated-will-data");
    });

    it("Should not allow update after trigger", async function () {
      await digitalWill.triggerWill(owner.address);
      await expect(
        digitalWill.updateWill("ipfs://updated-will-data")
      ).to.be.revertedWith("Will already triggered");
    });
  });

  describe("Will Triggering", function () {
    beforeEach(async function () {
      await digitalWill.createWill("ipfs://test-will-data");
      await digitalWill.addBeneficiary(beneficiary1.address, "Beneficiary 1", "share-1", 100);
    });

    it("Should trigger will", async function () {
      await digitalWill.triggerWill(owner.address);
      const will = await digitalWill.getWill(owner.address);
      expect(will.isTriggered).to.be.true;
    });

    it("Should allow beneficiary to claim after trigger", async function () {
      await digitalWill.triggerWill(owner.address);
      await expect(
        digitalWill.connect(beneficiary1).claimAssets(owner.address)
      ).to.emit(digitalWill, "AssetClaimed")
        .withArgs(owner.address, beneficiary1.address, await ethers.provider.getBlock("latest").then(b => b!.timestamp + 1));
    });

    it("Should not allow non-beneficiary to claim", async function () {
      await digitalWill.triggerWill(owner.address);
      await expect(
        digitalWill.connect(beneficiary2).claimAssets(owner.address)
      ).to.be.revertedWith("Not a beneficiary");
    });
  });
});
