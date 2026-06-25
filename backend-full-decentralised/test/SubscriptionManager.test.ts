import { expect } from "chai";
import { ethers } from "hardhat";

describe("SubscriptionManager", function () {
  let subscriptionManager: any;
  let mockToken: any;
  let owner: any;
  let user1: any;
  let user2: any;

  const parseUSDC = (amount: string) => ethers.parseUnits(amount, 6);

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const MockERC20 = await ethers.getContractFactory("MockERC20");
    mockToken = await MockERC20.deploy("Mock USDC", "USDC", parseUSDC("1000000"));

    const SubscriptionManager = await ethers.getContractFactory("SubscriptionManager");
    subscriptionManager = await SubscriptionManager.deploy();

    await subscriptionManager.addSupportedToken(await mockToken.getAddress());
    await mockToken.transfer(user1.address, parseUSDC("10000"));
    await mockToken.transfer(user2.address, parseUSDC("10000"));
  });

  describe("Deployment", function () {
    it("Should set correct owner", async function () {
      expect(await subscriptionManager.owner()).to.equal(owner.address);
    });

    it("Should initialize Starter plan", async function () {
      const plan = await subscriptionManager.plans(0); // PlanType.STARTER
      expect(plan.name).to.equal("Starter");
      expect(plan.pricePerMonth).to.equal(parseUSDC("4.99"));
      expect(plan.pricePerYear).to.equal(parseUSDC("49.90"));
      expect(plan.active).to.be.true;
    });
  });

  describe("Token Management", function () {
    it("Should allow owner to add and remove supported tokens", async function () {
      const randomToken = ethers.Wallet.createRandom().address;
      
      await subscriptionManager.addSupportedToken(randomToken);
      expect(await subscriptionManager.supportedTokens(randomToken)).to.be.true;

      await subscriptionManager.removeSupportedToken(randomToken);
      expect(await subscriptionManager.supportedTokens(randomToken)).to.be.false;
    });

    it("Should not allow non-owner to add or remove tokens", async function () {
      const randomToken = ethers.Wallet.createRandom().address;
      
      await expect(
        subscriptionManager.connect(user1).addSupportedToken(randomToken)
      ).to.be.revertedWithCustomError(subscriptionManager, "OwnableUnauthorizedAccount");

      await expect(
        subscriptionManager.connect(user1).removeSupportedToken(randomToken)
      ).to.be.revertedWithCustomError(subscriptionManager, "OwnableUnauthorizedAccount");
    });
  });

  describe("Subscription Flow", function () {
    it("Should subscribe to Starter monthly", async function () {
      const price = parseUSDC("4.99");
      await mockToken.connect(user1).approve(await subscriptionManager.getAddress(), price);
      
      await subscriptionManager.connect(user1).subscribeMonthly(0, await mockToken.getAddress()); // PlanType.STARTER

      const sub = await subscriptionManager.subscriptions(user1.address);
      expect(sub.active).to.be.true;
      expect(sub.plan).to.equal(0);
      expect(await subscriptionManager.hasActiveSubscription(user1.address)).to.be.true;
    });

    it("Should subscribe to Starter yearly", async function () {
      const price = parseUSDC("49.90");
      await mockToken.connect(user1).approve(await subscriptionManager.getAddress(), price);
      
      await subscriptionManager.connect(user1).subscribeYearly(0, await mockToken.getAddress()); // PlanType.STARTER

      const sub = await subscriptionManager.subscriptions(user1.address);
      expect(sub.active).to.be.true;
      expect(sub.plan).to.equal(0);
      expect(await subscriptionManager.hasActiveSubscription(user1.address)).to.be.true;
    });

    it("Should not allow double subscription", async function () {
      const price = parseUSDC("4.99");
      await mockToken.connect(user1).approve(await subscriptionManager.getAddress(), price * 2n);
      
      await subscriptionManager.connect(user1).subscribeMonthly(0, await mockToken.getAddress());

      await expect(
        subscriptionManager.connect(user1).subscribeMonthly(0, await mockToken.getAddress())
      ).to.be.revertedWith("Already subscribed");
    });

    it("Should not allow subscribing with unsupported token", async function () {
      const unsupportedToken = ethers.Wallet.createRandom().address;
      
      await expect(
        subscriptionManager.connect(user1).subscribeMonthly(0, unsupportedToken)
      ).to.be.revertedWith("Payment token not supported");
    });
  });

  describe("Renewal and Cancellation", function () {
    beforeEach(async function () {
      const price = parseUSDC("4.99");
      await mockToken.connect(user1).approve(await subscriptionManager.getAddress(), price * 10n);
      await subscriptionManager.connect(user1).subscribeMonthly(0, await mockToken.getAddress());
    });

    it("Should renew subscription", async function () {
      const subBefore = await subscriptionManager.subscriptions(user1.address);
      
      await subscriptionManager.connect(user1).renewSubscription(false, await mockToken.getAddress());
      
      const subAfter = await subscriptionManager.subscriptions(user1.address);
      expect(subAfter.endTime).to.be.greaterThan(subBefore.endTime);
    });

    it("Should cancel subscription", async function () {
      await subscriptionManager.connect(user1).cancelSubscription();
      
      const sub = await subscriptionManager.subscriptions(user1.address);
      expect(sub.active).to.be.false;
      expect(await subscriptionManager.hasActiveSubscription(user1.address)).to.be.false;
    });
  });

  describe("Admin and Withdrawal Functions", function () {
    it("Should allow owner to update plan details", async function () {
      await subscriptionManager.updatePlan(0, parseUSDC("6.99"), parseUSDC("69.90"), true);
      
      const plan = await subscriptionManager.plans(0);
      expect(plan.pricePerMonth).to.equal(parseUSDC("6.99"));
      expect(plan.pricePerYear).to.equal(parseUSDC("69.90"));
    });

    it("Should allow owner to withdraw funds", async function () {
      const price = parseUSDC("4.99");
      await mockToken.connect(user1).approve(await subscriptionManager.getAddress(), price);
      await subscriptionManager.connect(user1).subscribeMonthly(0, await mockToken.getAddress());

      const balanceBefore = await mockToken.balanceOf(owner.address);
      await subscriptionManager.withdraw(await mockToken.getAddress(), price);
      const balanceAfter = await mockToken.balanceOf(owner.address);

      expect(balanceAfter - balanceBefore).to.equal(price);
    });
  });
});
