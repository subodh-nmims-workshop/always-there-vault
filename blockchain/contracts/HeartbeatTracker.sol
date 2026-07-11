// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

/**
 * @title HeartbeatTracker
 * @dev Smart contract for tracking user heartbeats and managing inactivity detection
 */
contract HeartbeatTracker {
    struct UserHeartbeat {
        uint256 lastHeartbeat;
        uint256 heartbeatInterval; // in seconds
        uint256 gracePeriod; // in seconds
        bool isActive;
    }
    
    mapping(address => UserHeartbeat) public userHeartbeats;
    
    event HeartbeatSubmitted(address indexed user, uint256 timestamp);
    event GracePeriodStarted(address indexed user, uint256 timestamp);
    event InactivityTriggered(address indexed user, uint256 timestamp);
    
    /**
     * @dev Submit a heartbeat to reset the inactivity timer
     */
    function submitHeartbeat() external {
        UserHeartbeat storage heartbeat = userHeartbeats[msg.sender];
        heartbeat.lastHeartbeat = block.timestamp;
        heartbeat.isActive = true;
        
        emit HeartbeatSubmitted(msg.sender, block.timestamp);
    }
    
    /**
     * @dev Configure heartbeat parameters for a user
     */
    function configureHeartbeat(uint256 interval, uint256 gracePeriod) external {
        require(interval >= 7 days, "Interval must be at least 7 days");
        require(interval <= 365 days, "Interval cannot exceed 365 days");
        require(gracePeriod >= 30 days, "Grace period must be at least 30 days");
        require(gracePeriod <= 180 days, "Grace period cannot exceed 180 days");
        
        UserHeartbeat storage heartbeat = userHeartbeats[msg.sender];
        heartbeat.heartbeatInterval = interval;
        heartbeat.gracePeriod = gracePeriod;
        heartbeat.lastHeartbeat = block.timestamp;
        heartbeat.isActive = true;
    }
    
    /**
     * @dev Check if a user is in grace period
     */
    function isInGracePeriod(address user) external view returns (bool) {
        UserHeartbeat memory heartbeat = userHeartbeats[user];
        if (!heartbeat.isActive) return false;
        
        uint256 timeSinceHeartbeat = block.timestamp - heartbeat.lastHeartbeat;
        return timeSinceHeartbeat > heartbeat.heartbeatInterval && 
               timeSinceHeartbeat <= (heartbeat.heartbeatInterval + heartbeat.gracePeriod);
    }
    
    /**
     * @dev Check if inactivity conditions are met
     */
    function isInactive(address user) external view returns (bool) {
        UserHeartbeat memory heartbeat = userHeartbeats[user];
        if (!heartbeat.isActive) return false;
        
        uint256 timeSinceHeartbeat = block.timestamp - heartbeat.lastHeartbeat;
        return timeSinceHeartbeat > (heartbeat.heartbeatInterval + heartbeat.gracePeriod);
    }
    
    /**
     * @dev Get user heartbeat information
     */
    function getUserHeartbeat(address user) external view returns (
        uint256 lastHeartbeat,
        uint256 heartbeatInterval,
        uint256 gracePeriod,
        bool isActive
    ) {
        UserHeartbeat memory heartbeat = userHeartbeats[user];
        return (
            heartbeat.lastHeartbeat,
            heartbeat.heartbeatInterval,
            heartbeat.gracePeriod,
            heartbeat.isActive
        );
    }
}