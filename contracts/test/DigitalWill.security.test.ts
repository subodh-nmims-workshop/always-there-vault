import { expect } from "chai";
import { ethers } from "hardhat";
import { DigitalWill } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("DigitalWill Security Fixes", function () {
  let digitalWill: DigitalWill;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  let nominee: SignerWithAddress;
  let otherAccount: SignerWithAddress;

  const ONE_DAY = 24 * 60 * 60;
  const GRACE_PERIOD = 3 * ONE_DAY;

  beforeEach(async function () {
    [owner, user, nominee, otherAccount] = await ethers.getSigners();
    const DigitalWillFactory = await ethers.getContractFactory("DigitalWill");
    digitalWill = await DigitalWillFactory.deploy();
  });

  describe("Registration & Security", function () {
    it("Should register a will with correct parameters", async function () {
      await digitalWill.connect(user).registerWill(ONE_DAY, GRACE_PERIOD);
      const will = await digitalWill.wills(user.address);
      expect(will.heartbeatInterval).to.equal(ONE_DAY);
      expect(will.gracePeriod).to.equal(GRACE_PERIOD);
      expect(will.isActive).to.be.true;
    });

    it("Should prevent registration with small interval", async function () {
      await expect(
        digitalWill.connect(user).registerWill(ONE_DAY - 1, GRACE_PERIOD)
      ).to.be.revertedWith("Interval must be at least 1 day");
    });
  });

  describe("Triggering Mechanism", function () {
    beforeEach(async function () {
      await digitalWill.connect(user).registerWill(ONE_DAY, GRACE_PERIOD);
    });

    it("Should not trigger before interval + grace period", async function () {
      await ethers.provider.send("evm_increaseTime", [ONE_DAY + GRACE_PERIOD - 100]);
      await ethers.provider.send("evm_mine", []);
      
      await expect(
        digitalWill.checkAndTrigger(user.address)
      ).to.be.revertedWith("Safety window not yet breached");
    });

    it("Should trigger after interval + grace period", async function () {
      await ethers.provider.send("evm_increaseTime", [ONE_DAY + GRACE_PERIOD + 1]);
      await ethers.provider.send("evm_mine", []);
      
      await expect(digitalWill.checkAndTrigger(user.address))
        .to.emit(digitalWill, "AlwaysThereTriggered");
      
      const will = await digitalWill.wills(user.address);
      expect(will.isTriggered).to.be.true;
    });
  });

  describe("Reentrancy & Access Control", function () {
    it("Should only allow owner to pause protocol", async function () {
      await expect(
        digitalWill.connect(user).pauseProtocol()
      ).to.be.revertedWithCustomError(digitalWill, "AccessControlUnauthorizedAccount");
      
      await digitalWill.connect(owner).pauseProtocol();
      expect(await digitalWill.paused()).to.be.true;
    });

    it("Should prevent actions when paused", async function () {
      await digitalWill.connect(owner).pauseProtocol();
      await expect(
        digitalWill.connect(user).registerWill(ONE_DAY, GRACE_PERIOD)
      ).to.be.revertedWithCustomError(digitalWill, "EnforcedPause");
    });
  });
});
