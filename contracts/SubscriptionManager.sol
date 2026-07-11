// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title SubscriptionManager
 * @dev Manages on-chain subscriptions for decentralized mode
 */
contract SubscriptionManager is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    enum PlanType { FREEDOM, SOVEREIGN, IMMORTAL }
    
    struct Plan {
        string name;
        uint256 pricePerMonth;
        uint256 pricePerYear;
        bool active;
    }
    
    struct Subscription {
        address user;
        PlanType plan;
        uint256 startTime;
        uint256 endTime;
        bool active;
        bool autoRenew;
    }
    
    // Plan configurations
    mapping(PlanType => Plan) public plans;
    
    // User subscriptions
    mapping(address => Subscription) public subscriptions;
    
    // Supported payment tokens (USDC, USDT, etc.)
    mapping(address => bool) public supportedTokens;
    
    // Events
    event SubscriptionCreated(address indexed user, PlanType plan, uint256 endTime);
    event SubscriptionRenewed(address indexed user, uint256 newEndTime);
    event SubscriptionCancelled(address indexed user);
    event PlanUpdated(PlanType plan, uint256 pricePerMonth, uint256 pricePerYear);
    event PaymentReceived(address indexed user, uint256 amount, address token);
    
    constructor() Ownable(msg.sender) {
        // Initialize plans (prices in USD with 6 decimals for USDC/USDT)
        plans[PlanType.FREEDOM] = Plan({
            name: "Freedom",
            pricePerMonth: 4_990000, // $4.99
            pricePerYear: 49_900000, // $49.90 (~2 months free)
            active: true
        });
        
        plans[PlanType.SOVEREIGN] = Plan({
            name: "Sovereign",
            pricePerMonth: 19_990000, // $19.99
            pricePerYear: 199_900000, // $199.90 (~2 months free)
            active: true
        });
        
        plans[PlanType.IMMORTAL] = Plan({
            name: "Immortal",
            pricePerMonth: 99_000000, // $99.00 (One-Time / Lifetime base equivalent calculation)
            pricePerYear: 99_000000, // $99.00 (Same fee for consistency as it's meant to be one-time)
            active: true
        });
    }
    
    /**
     * @dev Subscribe to a plan with monthly payment
     */
    function subscribeMonthly(
        PlanType planType,
        address paymentToken
    ) external nonReentrant {
        require(supportedTokens[paymentToken], "Payment token not supported");
        require(plans[planType].active, "Plan not active");
        require(!subscriptions[msg.sender].active, "Already subscribed");
        
        Plan memory plan = plans[planType];
        
        // Effects (Update state before interaction)
        uint256 endTime = block.timestamp + 30 days;
        subscriptions[msg.sender] = Subscription({
            user: msg.sender,
            plan: planType,
            startTime: block.timestamp,
            endTime: endTime,
            active: true,
            autoRenew: false
        });
        
        // Interactions
        uint256 amount = plan.pricePerMonth;
        uint256 ownerShare = amount / 2;
        uint256 contractShare = amount - ownerShare;
        
        IERC20(paymentToken).safeTransferFrom(msg.sender, address(this), contractShare);
        IERC20(paymentToken).safeTransferFrom(msg.sender, owner(), ownerShare);
        
        emit SubscriptionCreated(msg.sender, planType, endTime);
        emit PaymentReceived(msg.sender, amount, paymentToken);
    }
    
    /**
     * @dev Subscribe to a plan with yearly payment (20% discount)
     */
    function subscribeYearly(
        PlanType planType,
        address paymentToken
    ) external nonReentrant {
        require(supportedTokens[paymentToken], "Payment token not supported");
        require(plans[planType].active, "Plan not active");
        require(!subscriptions[msg.sender].active, "Already subscribed");
        
        Plan memory plan = plans[planType];
        
        // Effects
        uint256 endTime = block.timestamp + 365 days;
        subscriptions[msg.sender] = Subscription({
            user: msg.sender,
            plan: planType,
            startTime: block.timestamp,
            endTime: endTime,
            active: true,
            autoRenew: false
        });
        
        // Interactions
        uint256 amount = plan.pricePerYear;
        uint256 ownerShare = amount / 2;
        uint256 contractShare = amount - ownerShare;
        
        IERC20(paymentToken).safeTransferFrom(msg.sender, address(this), contractShare);
        IERC20(paymentToken).safeTransferFrom(msg.sender, owner(), ownerShare);
        
        emit SubscriptionCreated(msg.sender, planType, endTime);
        emit PaymentReceived(msg.sender, amount, paymentToken);
    }
    
    /**
     * @dev Renew subscription
     */
    function renewSubscription(
        bool yearly,
        address paymentToken
    ) external nonReentrant {
        require(supportedTokens[paymentToken], "Payment token not supported");
        
        Subscription storage sub = subscriptions[msg.sender];
        require(sub.user == msg.sender, "No subscription found");
        
        Plan memory plan = plans[sub.plan];
        require(plan.active, "Plan not active");
        
        uint256 price = yearly ? plan.pricePerYear : plan.pricePerMonth;
        uint256 duration = yearly ? 365 days : 30 days;
        
        // Effects
        if (sub.active && sub.endTime > block.timestamp) {
            sub.endTime += duration;
        } else {
            sub.startTime = block.timestamp;
            sub.endTime = block.timestamp + duration;
            sub.active = true;
        }
        
        // Interactions
        uint256 ownerShare = price / 2;
        uint256 contractShare = price - ownerShare;
        
        IERC20(paymentToken).safeTransferFrom(msg.sender, address(this), contractShare);
        IERC20(paymentToken).safeTransferFrom(msg.sender, owner(), ownerShare);
        
        emit SubscriptionRenewed(msg.sender, sub.endTime);
        emit PaymentReceived(msg.sender, price, paymentToken);
    }
    
    /**
     * @dev Cancel subscription
     */
    function cancelSubscription() external {
        Subscription storage sub = subscriptions[msg.sender];
        require(sub.user == msg.sender, "No subscription found");
        require(sub.active, "Subscription not active");
        
        sub.active = false;
        sub.autoRenew = false;
        
        emit SubscriptionCancelled(msg.sender);
    }
    
    /**
     * @dev Check if user has active subscription
     */
    function hasActiveSubscription(address user) external view returns (bool) {
        Subscription memory sub = subscriptions[user];
        return sub.active && sub.endTime > block.timestamp;
    }
    
    /**
     * @dev Get subscription details
     */
    function getSubscription(address user) external view returns (
        PlanType plan,
        uint256 startTime,
        uint256 endTime,
        bool active,
        uint256 daysRemaining
    ) {
        Subscription memory sub = subscriptions[user];
        uint256 remaining = 0;
        
        if (sub.active && sub.endTime > block.timestamp) {
            remaining = (sub.endTime - block.timestamp) / 1 days;
        }
        
        return (
            sub.plan,
            sub.startTime,
            sub.endTime,
            sub.active && sub.endTime > block.timestamp,
            remaining
        );
    }
    
    /**
     * @dev Update plan pricing (owner only)
     */
    function updatePlan(
        PlanType planType,
        uint256 pricePerMonth,
        uint256 pricePerYear,
        bool active
    ) external onlyOwner {
        plans[planType].pricePerMonth = pricePerMonth;
        plans[planType].pricePerYear = pricePerYear;
        plans[planType].active = active;
        
        emit PlanUpdated(planType, pricePerMonth, pricePerYear);
    }
    
    /**
     * @dev Add supported payment token (owner only)
     */
    function addSupportedToken(address token) external onlyOwner {
        supportedTokens[token] = true;
    }
    
    /**
     * @dev Remove supported payment token (owner only)
     */
    function removeSupportedToken(address token) external onlyOwner {
        supportedTokens[token] = false;
    }
    
    /**
     * @dev Withdraw collected payments (owner only)
     */
    function withdraw(address token, uint256 amount) external onlyOwner {
        if (token == address(0)) {
            (bool success, ) = payable(owner()).call{value: amount}("");
            require(success, "ETH transfer failed");
        } else {
            IERC20(token).safeTransfer(owner(), amount);
        }
    }
    
    /**
     * @dev Accept ETH payments
     */
    receive() external payable {}
}
