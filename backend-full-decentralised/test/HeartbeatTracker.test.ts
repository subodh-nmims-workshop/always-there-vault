import { expect } from "chai";
import { ethers } from "hardhat";
import { HeartbeatTracker } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("HeartbeatTracker", function () {
  let heartbeatTracker: HeartbeatTracker;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();

    const HeartbeatTracker = await ethers.getContractFactory("HeartbeatTracker");
    heartbeatTracker = await HeartbeatTracker.deploy();
    await heartbeatTracker.waitForDeployment();
  });

  describe("Configuration", function () {
    it("Should configure heartbeat settings", async function () {
      const interval = 7 * 24 * 60 * 60; // 7 days
      const gracePeriod = 3 * 24 * 60 * 60; // 3 days

      await heartbeatTracker.configureHeartbeat(interval, gracePeriod);

      const heartbeat = await heartbeatTracker.getUserHeartbeat(owner.address);
      expect(heartbeat.heartbeatInterval).to.equal(interval);
      expect(heartbeat.gracePeriod).to.equal(gracePeriod);
      expect(heartbeat.isActive).to.be.true;
    });

    it("Should reject invalid intervals", async function () {
      const invalidInterval = 12 * 60 * 60; // 12 hours (less than 1 day)
      const gracePeriod = 3 * 24 * 60 * 60;

      await expect(
        heartbeatTracker.configureHeartbeat(invalidInterval, gracePeriod)
      ).to.be.revertedWith("Interval must be at least 1 day");
    });

    it("Should reject invalid grace periods", async function () {
      const interval = 7 * 24 * 60 * 60;
      const invalidGracePeriod = 12 * 60 * 60; // 12 hours (less than 1 day)

      await expect(
        heartbeatTracker.configureHeartbeat(interval, invalidGracePeriod)
      ).to.be.revertedWith("Grace period must be at least 1 day");
    });
  });

  describe("Heartbeat Submission", function () {
    beforeEach(async function () {
      const interval = 7 * 24 * 60 * 60;
      const gracePeriod = 3 * 24 * 60 * 60;
      await heartbeatTracker.configureHeartbeat(interval, gracePeriod);
    });

    it("Should submit heartbeat", async function () {
      await heartbeatTracker.submitHeartbeat();

      const heartbeat = await heartbeatTracker.getUserHeartbeat(owner.address);
      expect(heartbeat.totalHeartbeats).to.equal(1);
      expect(heartbeat.isActive).to.be.true;
    });

    it("Should emit HeartbeatSubmitted event", async function () {
      await expect(heartbeatTracker.submitHeartbeat())
        .to.emit(heartbeatTracker, "HeartbeatSubmitted")
        .withArgs(owner.address, await ethers.provider.getBlock('latest').then(b => b!.timestamp + 1), 1);
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

  describe("Status Checks", function () {
    beforeEach(async function () {
      const interval = 7 * 24 * 60 * 60;
      const gracePeriod = 3 * 24 * 60 * 60;
      await heartbeatTracker.configureHeartbeat(interval, gracePeriod);
      await heartbeatTracker.submitHeartbeat();
    });

    it("Should not be in grace period initially", async function () {
      const isInGrace = await heartbeatTracker.isInGracePeriod(owner.address);
      expect(isInGrace).to.be.false;
    });

    it("Should not be inactive initially", async function () {
      const isInactive = await heartbeatTracker.isInactive(owner.address);
      expect(isInactive).to.be.false;
    });

    it("Should calculate time until due", async function () {
      const timeUntilDue = await heartbeatTracker.getTimeUntilDue(owner.address);
      const interval = 7 * 24 * 60 * 60;
      
      expect(timeUntilDue).to.be.closeTo(interval, 5);
    });
  });

  describe("Multiple Users", function () {
    it("Should handle multiple users independently", async function () {
      // Owner configures
      await heartbeatTracker.connect(owner).configureHeartbeat(
        7 * 24 * 60 * 60,
        3 * 24 * 60 * 60
      );

      // User1 configures
      await heartbeatTracker.connect(user1).configureHeartbeat(
        14 * 24 * 60 * 60,
        5 * 24 * 60 * 60
      );

      const ownerHeartbeat = await heartbeatTracker.getUserHeartbeat(owner.address);
      const user1Heartbeat = await heartbeatTracker.getUserHeartbeat(user1.address);

      expect(ownerHeartbeat.heartbeatInterval).to.equal(7 * 24 * 60 * 60);
      expect(user1Heartbeat.heartbeatInterval).to.equal(14 * 24 * 60 * 60);
    });
  });
});
