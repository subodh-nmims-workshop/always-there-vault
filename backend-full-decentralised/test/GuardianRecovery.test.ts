import { expect } from "chai";
import { ethers } from "hardhat";
import { GuardianRecovery, DigitalWill } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("GuardianRecovery", function () {
  let recovery: GuardianRecovery;
  let digitalWill: DigitalWill;
  let owner: SignerWithAddress;
  let newOwner: SignerWithAddress;
  let guardian1: SignerWithAddress;
  let guardian2: SignerWithAddress;
  let guardian3: SignerWithAddress;
  let guardian4: SignerWithAddress;
  let guardian5: SignerWithAddress;
  let nonGuardian: SignerWithAddress;

  beforeEach(async function () {
    [
      owner,
      newOwner,
      guardian1,
      guardian2,
      guardian3,
      guardian4,
      guardian5,
      nonGuardian
    ] = await ethers.getSigners();

    const GuardianRecoveryFactory = await ethers.getContractFactory("GuardianRecovery");
    recovery = await GuardianRecoveryFactory.deploy();
    await recovery.waitForDeployment();

    const DigitalWillFactory = await ethers.getContractFactory("DigitalWill");
    digitalWill = await DigitalWillFactory.deploy();
    await digitalWill.waitForDeployment();

    // Link the contracts
    await recovery.setDigitalWill(await digitalWill.getAddress());
    await digitalWill.setGuardianRecovery(await recovery.getAddress());

    // Set up 5 guardians for owner
    await recovery.connect(owner).addGuardian(guardian1.address);
    await recovery.connect(owner).addGuardian(guardian2.address);
    await recovery.connect(owner).addGuardian(guardian3.address);
    await recovery.connect(owner).addGuardian(guardian4.address);
    await recovery.connect(owner).addGuardian(guardian5.address);
  });

  describe("Guardian Management", function () {
    it("Should list guardians", async function () {
      const list = await recovery.getGuardians(owner.address);
      expect(list.length).to.equal(5);
      expect(list[0]).to.equal(guardian1.address);
    });

    it("Should remove a guardian", async function () {
      await recovery.connect(owner).removeGuardian(guardian5.address);
      const list = await recovery.getGuardians(owner.address);
      expect(list.length).to.equal(4);
    });
  });

  describe("Veto / Cancel Recovery", function () {
    beforeEach(async function () {
      // Initiate recovery from guardian1
      await recovery.connect(guardian1).initiateRecovery(owner.address, newOwner.address);
    });

    it("Should allow the owner to cancel immediately", async function () {
      await expect(recovery.connect(owner).cancelRecovery(owner.address))
        .to.emit(recovery, "RecoveryCancelled")
        .withArgs(owner.address, 1);

      const req = await recovery.recoveryRequests(owner.address);
      expect(req.executed).to.be.true;
    });

    it("Should count single guardian veto without cancelling", async function () {
      await expect(recovery.connect(guardian2).cancelRecovery(owner.address))
        .to.emit(recovery, "RecoveryVetoed")
        .withArgs(owner.address, guardian2.address, 1, 1);

      const req = await recovery.recoveryRequests(owner.address);
      expect(req.executed).to.be.false;
      expect(await recovery.recoveryVetoes(owner.address)).to.equal(1);
    });

    it("Should cancel recovery once majority (2 guardians) veto", async function () {
      await recovery.connect(guardian2).cancelRecovery(owner.address);
      
      await expect(recovery.connect(guardian3).cancelRecovery(owner.address))
        .to.emit(recovery, "RecoveryCancelled")
        .withArgs(owner.address, 1);

      const req = await recovery.recoveryRequests(owner.address);
      expect(req.executed).to.be.true;
    });

    it("Should not allow same guardian to veto twice", async function () {
      await recovery.connect(guardian2).cancelRecovery(owner.address);
      await expect(
        recovery.connect(guardian2).cancelRecovery(owner.address)
      ).to.be.revertedWith("Already vetoed this request");
    });

    it("Should not allow non-guardian/non-owner to cancel/veto", async function () {
      await expect(
        recovery.connect(nonGuardian).cancelRecovery(owner.address)
      ).to.be.revertedWith("Not authorized to cancel");
    });
  });

  describe("Recovery Execution", function () {
    it("Should allow recovery to proceed with 3 approvals and transfer DigitalWill ownership", async function () {
      // Setup a will for the owner first
      await digitalWill.connect(owner).createWill("ipfs://owner-will-cid");
      const willBefore = await digitalWill.getWill(owner.address);
      expect(willBefore.isActive).to.be.true;
      expect(willBefore.ipfsCID).to.equal("ipfs://owner-will-cid");

      await recovery.connect(guardian1).initiateRecovery(owner.address, newOwner.address);
      await recovery.connect(guardian2).approveRecovery(owner.address);
      await recovery.connect(guardian3).approveRecovery(owner.address);

      const req = await recovery.recoveryRequests(owner.address);
      expect(req.approvals).to.equal(3);

      // Fast forward time by 7 days + 1 second
      await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60 + 1]);
      await ethers.provider.send("evm_mine", []);

      await expect(recovery.executeRecovery(owner.address))
        .to.emit(recovery, "RecoveryExecuted")
        .withArgs(owner.address, newOwner.address, 1);

      // Verify that the will is now owned by newOwner and deleted from owner
      const oldOwnerWill = await digitalWill.getWill(owner.address);
      expect(oldOwnerWill.isActive).to.be.false;

      const newOwnerWill = await digitalWill.getWill(newOwner.address);
      expect(newOwnerWill.isActive).to.be.true;
      expect(newOwnerWill.ipfsCID).to.equal("ipfs://owner-will-cid");
    });

    it("Should not count approval from a guardian if they are removed before execution", async function () {
      await recovery.connect(guardian1).initiateRecovery(owner.address, newOwner.address);
      await recovery.connect(guardian2).approveRecovery(owner.address);
      await recovery.connect(guardian3).approveRecovery(owner.address);

      // Now remove guardian3
      await recovery.connect(owner).removeGuardian(guardian3.address);

      // Fast forward time
      await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60 + 1]);
      await ethers.provider.send("evm_mine", []);

      // Expect execution to fail because we only have 2 active approvals (guardian1 and guardian2)
      await expect(
        recovery.executeRecovery(owner.address)
      ).to.be.revertedWith("Insufficient approvals from active guardians");
    });
  });
});
