import { expect } from "chai";
import { ethers } from "hardhat";
import { HeartbeatTracker } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("HeartbeatTracker", function () {
  let heartbeatTracker: HeartbeatTracker;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const HeartbeatTrackerFactory = await ethers.getContractFactory("HeartbeatTracker");
    heartbeatTracker = await HeartbeatTrackerFactory.deploy();
    await heartbeatTracker.waitForDeployment();
  });

  describe("Heartbeat Configuration", function () {
    it("Should configure heartbeat settings", async function () {
      const interval = 30 * 24 * 60 * 60; // 30 days
      const gracePeriod = 7 * 24 * 60 * 60; // 7 days
      
      await heartbeatTracker.configureHeartbeat(interval, gracePeriod);
      
      const heartbeat = await heartbeatTracker.getUserHeartbeat(owner.address);
      expect(heartbeat.heartbeatInterval).to.equal(interval);
      expect(heartbeat.gracePeriod).to.equal(gracePeriod);
      expect(heartbeat.isActive).to.be.true;
    });

    it("Should not allow interval less than 1 day", async function () {
      const interval = 12 * 60 * 60; // 12 hours
      const gracePeriod = 7 * 24 * 60 * 60; // 7 days
      
      await expect(
        heartbeatTracker.configureHeartbeat(interval, gracePeriod)
      ).to.be.revertedWith("Interval must be at least 1 day");
    });

    it("Should not allow grace period less than 1 day", async function () {
      const interval = 30 * 24 * 60 * 60; // 30 days
      const gracePeriod = 12 * 60 * 60; // 12 hours
      
      await expect(
        heartbeatTracker.configureHeartbeat(interval, gracePeriod)
      ).to.be.revertedWith("Grace period must be at least 1 day");
    });
  });

  describe("Heartbeat Submission", function () {
    beforeEach(async function () {
      const interval = 30 * 24 * 60 * 60; // 30 days
      const gracePeriod = 7 * 24 * 60 * 60; // 7 days
      await heartbeatTracker.configureHeartbeat(interval, gracePeriod);
    });

    it("Should submit heartbeat", async function () {
      await heartbeatTracker.submitHeartbeat();
      
      const heartbeat = await heartbeatTracker.getUserHeartbeat(owner.address);
      expect(heartbeat.totalHeartbeats).to.equal(1);
      expect(heartbeat.lastHeartbeat).to.be.gt(0);
    });

    it("Should increment heartbeat count", async function () {
      await heartbeatTracker.submitHeartbeat();
      await heartbeatTracker.submitHeartbeat();
      await heartbeatTracker.submitHeartbeat();
      
      const heartbeat = await heartbeatTracker.getUserHeartbeat(owner.address);
      expect(heartbeat.totalHeartbeats).to.equal(3);
    });

    it("Should store heartbeat history", async function () {
      await heartbeatTracker.submitHeartbeat();
      await heartbeatTracker.submitHeartbeat();
      
      const history = await heartbeatTracker.getHeartbeatHistory(owner.address);
      expect(history.length).to.equal(2);
    });
  });

  describe("Inactivity Detection", function () {
    beforeEach(async function () {
      const interval = 30 * 24 * 60 * 60; // 30 days
      const gracePeriod = 7 * 24 * 60 * 60; // 7 days
      await heartbeatTracker.configureHeartbeat(interval, gracePeriod);
      await heartbeatTracker.submitHeartbeat();
    });

    it("Should not be in grace period immediately after heartbeat", async function () {
      const inGrace = await heartbeatTracker.isInGracePeriod(owner.address);
      expect(inGrace).to.be.false;
    });

    it("Should be in grace period after interval expires", async function () {
      // Fast forward 31 days (past interval, within grace period)
      await ethers.provider.send("evm_increaseTime", [31 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine", []);
      
      const inGrace = await heartbeatTracker.isInGracePeriod(owner.address);
      expect(inGrace).to.be.true;
    });

    it("Should be inactive after grace period expires", async function () {
      // Fast forward 38 days (past interval + grace period)
      await ethers.provider.send("evm_increaseTime", [38 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine", []);
      
      const isInactive = await heartbeatTracker.isInactive(owner.address);
      expect(isInactive).to.be.true;
    });

    it("Should not be inactive within interval", async function () {
      const isInactive = await heartbeatTracker.isInactive(owner.address);
      expect(isInactive).to.be.false;
    });
  });

  describe("Time Calculations", function () {
    beforeEach(async function () {
      const interval = 30 * 24 * 60 * 60; // 30 days
      const gracePeriod = 7 * 24 * 60 * 60; // 7 days
      await heartbeatTracker.configureHeartbeat(interval, gracePeriod);
      await heartbeatTracker.submitHeartbeat();
    });

    it("Should calculate time until due", async function () {
      const timeUntilDue = await heartbeatTracker.getTimeUntilDue(owner.address);
      const interval = 30 * 24 * 60 * 60;
      expect(timeUntilDue).to.be.closeTo(interval, 10); // Within 10 seconds
    });

    it("Should return 0 when overdue", async function () {
      // Fast forward 31 days
      await ethers.provider.send("evm_increaseTime", [31 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine", []);
      
      const timeUntilDue = await heartbeatTracker.getTimeUntilDue(owner.address);
      expect(timeUntilDue).to.equal(0);
    });
  });

  describe("Multiple Users", function () {
    it("Should track heartbeats independently", async function () {
      // Configure for owner
      await heartbeatTracker.configureHeartbeat(30 * 24 * 60 * 60, 7 * 24 * 60 * 60);
      await heartbeatTracker.submitHeartbeat();
      
      // Configure for user1
      await heartbeatTracker.connect(user1).configureHeartbeat(60 * 24 * 60 * 60, 14 * 24 * 60 * 60);
      await heartbeatTracker.connect(user1).submitHeartbeat();
      
      const ownerHeartbeat = await heartbeatTracker.getUserHeartbeat(owner.address);
      const user1Heartbeat = await heartbeatTracker.getUserHeartbeat(user1.address);
      
      expect(ownerHeartbeat.heartbeatInterval).to.equal(30 * 24 * 60 * 60);
      expect(user1Heartbeat.heartbeatInterval).to.equal(60 * 24 * 60 * 60);
    });
  });

  describe("Events", function () {
    it("Should emit HeartbeatSubmitted event", async function () {
      const interval = 30 * 24 * 60 * 60;
      const gracePeriod = 7 * 24 * 60 * 60;
      await heartbeatTracker.configureHeartbeat(interval, gracePeriod);
      
      await expect(heartbeatTracker.submitHeartbeat())
        .to.emit(heartbeatTracker, "HeartbeatSubmitted")
        .withArgs(owner.address, await ethers.provider.getBlock("latest").then(b => b!.timestamp + 1), 1);
    });

    it("Should emit SettingsUpdated event", async function () {
      const interval = 30 * 24 * 60 * 60;
      const gracePeriod = 7 * 24 * 60 * 60;
      
      await expect(heartbeatTracker.configureHeartbeat(interval, gracePeriod))
        .to.emit(heartbeatTracker, "SettingsUpdated")
        .withArgs(owner.address, interval, gracePeriod);
    });
  });
});
