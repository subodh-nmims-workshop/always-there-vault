import { expect } from "chai";
import { ethers } from "hardhat";

describe("SubscriptionManager", function () {
  let subscriptionManager: any;
  let mockToken: any;
  let owner: any;
  let user1: any;
  let user2: any;
  let profitWallet: any;
  let operationalWallet: any;

  const parseUSDC = (amount: string) => ethers.parseUnits(amount, 6);

  beforeEach(async function () {
    [owner, user1, user2, profitWallet, operationalWallet] = await ethers.getSigners();

    const MockERC20 = await ethers.getContractFactory("MockERC20");
    mockToken = await MockERC20.deploy("Mock USDC", "USDC", parseUSDC("1000000"));

    const SubscriptionManager = await ethers.getContractFactory("SubscriptionManager");
    subscriptionManager = await SubscriptionManager.deploy(profitWallet.address, operationalWallet.address);

    await subscriptionManager.addSupportedToken(await mockToken.getAddress());
    await mockToken.transfer(user1.address, parseUSDC("10000"));
    await mockToken.transfer(user2.address, parseUSDC("10000"));
  });

  describe("Deployment", function () {
    it("Should set correct owner", async function () {
      expect(await subscriptionManager.owner()).to.equal(owner.address);
    });

    it("Should set profit and operational wallets", async function () {
      expect(await subscriptionManager.profitWallet()).to.equal(profitWallet.address);
      expect(await subscriptionManager.operationalWallet()).to.equal(operationalWallet.address);
    });

    it("Should initialize Starter plan", async function () {
      const plan = await subscriptionManager.plans(0);
      expect(plan.name).to.equal("Starter");
      expect(plan.pricePerMonth).to.equal(parseUSDC("9.99"));
      expect(plan.storageGB).to.equal(2);
    });
  });

  describe("Free Trial", function () {
    it("Should activate trial", async function () {
      await subscriptionManager.connect(user1).activateTrial();
      expect(await subscriptionManager.hasActiveTrial(user1.address)).to.be.true;
    });

    it("Should not allow trial twice", async function () {
      await subscriptionManager.connect(user1).activateTrial();
      await expect(subscriptionManager.connect(user1).activateTrial()).to.be.revertedWith("Trial already used");
    });

    it("Should provide 500MB storage for trial", async function () {
      await subscriptionManager.connect(user1).activateTrial();
      expect(await subscriptionManager.getStorageLimit(user1.address)).to.equal(500);
    });

    it("Should allow service during trial", async function () {
      await subscriptionManager.connect(user1).activateTrial();
      expect(await subscriptionManager.canUseService(user1.address)).to.be.true;
    });
  });

  describe("Monthly Subscription", function () {
    it("Should subscribe to Starter monthly", async function () {
      const price = parseUSDC("9.99");
      await mockToken.connect(user1).approve(await subscriptionManager.getAddress(), price);
      await subscriptionManager.connect(user1).subscribeMonthly(0, await mockToken.getAddress());

      const sub = await subscriptionManager.subscriptions(user1.address);
      expect(sub.active).to.be.true;
      expect(sub.plan).to.equal(0);
    });

    it("Should split payment 60/40", async function () {
      const price = parseUSDC("9.99");
      await mockToken.connect(user1).approve(await subscriptionManager.getAddress(), price);

      const profitBefore = await mockToken.balanceOf(profitWallet.address);
      const opBefore = await mockToken.balanceOf(operationalWallet.address);

      await subscriptionManager.connect(user1).subscribeMonthly(0, await mockToken.getAddress());

      const profitAfter = await mockToken.balanceOf(profitWallet.address);
      const opAfter = await mockToken.balanceOf(operationalWallet.address);

      expect(profitAfter - profitBefore).to.equal(parseUSDC("5.994"));
      expect(opAfter - opBefore).to.equal(parseUSDC("3.996"));
    });

    it("Should not allow double subscription", async function () {
      const price = parseUSDC("9.99");
      await mockToken.connect(user1).approve(await subscriptionManager.getAddress(), price * 2n);
      await subscriptionManager.connect(user1).subscribeMonthly(0, await mockToken.getAddress());

      await expect(
        subscriptionManager.connect(user1).subscribeMonthly(0, await mockToken.getAddress())
      ).to.be.revertedWith("Already subscribed");
    });
  });

  describe("Yearly Subscription", function () {
    it("Should subscribe to Guardian yearly", async function () {
      const price = parseUSDC("249");
      await mockToken.connect(user1).approve(await subscriptionManager.getAddress(), price);
      await subscriptionManager.connect(user1).subscribeYearly(1, await mockToken.getAddress());

      const sub = await subscriptionManager.subscriptions(user1.address);
      expect(sub.active).to.be.true;
      expect(sub.plan).to.equal(1);
    });

    it("Should provide 10GB storage", async function () {
      const price = parseUSDC("249");
      await mockToken.connect(user1).approve(await subscriptionManager.getAddress(), price);
      await subscriptionManager.connect(user1).subscribeYearly(1, await mockToken.getAddress());

      expect(await subscriptionManager.getStorageLimit(user1.address)).to.equal(10240);
    });
  });

  describe("Plan Upgrade", function () {
    it("Should upgrade from Starter to Guardian", async function () {
      await mockToken.connect(user1).approve(await subscriptionManager.getAddress(), parseUSDC("1000"));
      await subscriptionManager.connect(user1).subscribeMonthly(0, await mockToken.getAddress());
      await subscriptionManager.connect(user1).upgradePlan(1, await mockToken.getAddress());

      const sub = await subscriptionManager.subscriptions(user1.address);
      expect(sub.plan).to.equal(1);
    });

    it("Should not allow downgrade", async function () {
      await mockToken.connect(user1).approve(await subscriptionManager.getAddress(), parseUSDC("1000"));
      await subscriptionManager.connect(user1).subscribeMonthly(1, await mockToken.getAddress());

      await expect(
        subscriptionManager.connect(user1).upgradePlan(0, await mockToken.getAddress())
      ).to.be.revertedWith("Can only upgrade to higher plan");
    });
  });

  describe("Storage Tracking", function () {
    it("Should update storage usage", async function () {
      await subscriptionManager.connect(user1).activateTrial();
      await subscriptionManager.updateStorageUsage(user1.address, 250);

      const trial = await subscriptionManager.trials(user1.address);
      expect(trial.storageUsedMB).to.equal(250);
    });
  });

  describe("Admin Functions", function () {
    it("Should update wallets", async function () {
      await subscriptionManager.updateWallets(user1.address, user2.address);
      expect(await subscriptionManager.profitWallet()).to.equal(user1.address);
      expect(await subscriptionManager.operationalWallet()).to.equal(user2.address);
    });

    it("Should add supported token", async function () {
      const newToken = ethers.Wallet.createRandom().address;
      await subscriptionManager.addSupportedToken(newToken);
      expect(await subscriptionManager.supportedTokens(newToken)).to.be.true;
    });

    it("Should update plan pricing", async function () {
      await subscriptionManager.updatePlan(0, parseUSDC("12.99"), parseUSDC("120"), 5, 5, 20, true);
      const plan = await subscriptionManager.plans(0);
      expect(plan.pricePerMonth).to.equal(parseUSDC("12.99"));
    });
  });
});
