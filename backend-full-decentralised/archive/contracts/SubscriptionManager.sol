// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title SubscriptionManager
 * @dev Manages on-chain subscriptions for decentralized mode
 */
contract SubscriptionManager is Ownable, ReentrancyGuard {
    
    enum PlanType { STARTER, PROFESSIONAL, ENTERPRISE, FREEDOM, SOVEREIGN, IMMORTAL }
    
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
        plans[PlanType.STARTER] = Plan({ name: "Starter", pricePerMonth: 4_990000, pricePerYear: 49_900000, active: true });
        plans[PlanType.PROFESSIONAL] = Plan({ name: "Professional", pricePerMonth: 14_990000, pricePerYear: 149_900000, active: true });
        plans[PlanType.ENTERPRISE] = Plan({ name: "Enterprise", pricePerMonth: 49_990000, pricePerYear: 499_900000, active: true });
        plans[PlanType.FREEDOM] = Plan({ name: "Freedom", pricePerMonth: 9_990000, pricePerYear: 99_900000, active: true });
        plans[PlanType.SOVEREIGN] = Plan({ name: "Sovereign", pricePerMonth: 29_990000, pricePerYear: 299_900000, active: true });
        plans[PlanType.IMMORTAL] = Plan({ name: "Immortal", pricePerMonth: 149_000000, pricePerYear: 1499_000000, active: true });
    }
    
    /**
     * @dev Subscribe to a plan with monthly payment
     */
    function subscribeMonthly(
        PlanType _plan,
        address _paymentToken
    ) external nonReentrant {
        require(supportedTokens[_paymentToken], "Payment token not supported");
        require(plans[_plan].active, "Plan not active");
        require(!subscriptions[msg.sender].active, "Already subscribed");
        
        Plan memory plan = plans[_plan];
        
        // Transfer payment
        IERC20(_paymentToken).transferFrom(
            msg.sender,
            address(this),
            plan.pricePerMonth
        );
        
        // Create subscription
        uint256 endTime = block.timestamp + 30 days;
        subscriptions[msg.sender] = Subscription({
            user: msg.sender,
            plan: _plan,
            startTime: block.timestamp,
            endTime: endTime,
            active: true,
            autoRenew: false
        });
        
        emit SubscriptionCreated(msg.sender, _plan, endTime);
        emit PaymentReceived(msg.sender, plan.pricePerMonth, _paymentToken);
    }
    
    /**
     * @dev Subscribe to a plan with yearly payment (20% discount)
     */
    function subscribeYearly(
        PlanType _plan,
        address _paymentToken
    ) external nonReentrant {
        require(supportedTokens[_paymentToken], "Payment token not supported");
        require(plans[_plan].active, "Plan not active");
        require(!subscriptions[msg.sender].active, "Already subscribed");
        
        Plan memory plan = plans[_plan];
        
        // Transfer payment
        IERC20(_paymentToken).transferFrom(
            msg.sender,
            address(this),
            plan.pricePerYear
        );
        
        // Create subscription
        uint256 endTime = block.timestamp + 365 days;
        subscriptions[msg.sender] = Subscription({
            user: msg.sender,
            plan: _plan,
            startTime: block.timestamp,
            endTime: endTime,
            active: true,
            autoRenew: false
        });
        
        emit SubscriptionCreated(msg.sender, _plan, endTime);
        emit PaymentReceived(msg.sender, plan.pricePerYear, _paymentToken);
    }
    
    /**
     * @dev Renew subscription
     */
    function renewSubscription(
        bool yearly,
        address _paymentToken
    ) external nonReentrant {
        require(supportedTokens[_paymentToken], "Payment token not supported");
        
        Subscription storage sub = subscriptions[msg.sender];
        require(sub.user == msg.sender, "No subscription found");
        require(sub.active, "Subscription is cancelled/inactive");
        
        Plan memory plan = plans[sub.plan];
        require(plan.active, "Plan not active");
        
        uint256 price = yearly ? plan.pricePerYear : plan.pricePerMonth;
        uint256 duration = yearly ? 365 days : 30 days;
        
        // Transfer payment
        IERC20(_paymentToken).transferFrom(
            msg.sender,
            address(this),
            price
        );
        
        // Extend subscription
        if (sub.active && sub.endTime > block.timestamp) {
            // Extend from current end time
            sub.endTime += duration;
        } else {
            // Restart from now
            sub.startTime = block.timestamp;
            sub.endTime = block.timestamp + duration;
            sub.active = true;
        }
        
        emit SubscriptionRenewed(msg.sender, sub.endTime);
        emit PaymentReceived(msg.sender, price, _paymentToken);
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
    function hasActiveSubscription(address _user) external view returns (bool) {
        Subscription memory sub = subscriptions[_user];
        return sub.active && sub.endTime > block.timestamp;
    }
    
    /**
     * @dev Get subscription details
     */
    function getSubscription(address _user) external view returns (
        PlanType plan,
        uint256 startTime,
        uint256 endTime,
        bool active,
        uint256 daysRemaining
    ) {
        Subscription memory sub = subscriptions[_user];
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
        PlanType _plan,
        uint256 _pricePerMonth,
        uint256 _pricePerYear,
        bool _active
    ) external onlyOwner {
        plans[_plan].pricePerMonth = _pricePerMonth;
        plans[_plan].pricePerYear = _pricePerYear;
        plans[_plan].active = _active;
        
        emit PlanUpdated(_plan, _pricePerMonth, _pricePerYear);
    }
    
    /**
     * @dev Add supported payment token (owner only)
     */
    function addSupportedToken(address _token) external onlyOwner {
        supportedTokens[_token] = true;
    }
    
    /**
     * @dev Remove supported payment token (owner only)
     */
    function removeSupportedToken(address _token) external onlyOwner {
        supportedTokens[_token] = false;
    }
    
    /**
     * @dev Withdraw collected payments (owner only)
     */
    function withdraw(address _token, uint256 _amount) external onlyOwner {
        if (_token == address(0)) {
            payable(owner()).transfer(_amount);
        } else {
            IERC20(_token).transfer(owner(), _amount);
        }
    }
    
    /**
     * @dev Accept ETH payments
     */
    receive() external payable {}
}
