// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title HeartbeatTracker
 * @dev Decentralized heartbeat tracking - NO BACKEND NEEDED!
 */
contract HeartbeatTracker {
    struct UserHeartbeat {
        uint256 lastHeartbeat;
        uint256 heartbeatInterval; // in seconds
        uint256 gracePeriod; // in seconds
        bool isActive;
        uint256 totalHeartbeats;
    }
    
    mapping(address => UserHeartbeat) public userHeartbeats;
    mapping(address => uint256[]) public heartbeatHistory;
    
    event HeartbeatSubmitted(address indexed user, uint256 timestamp, uint256 count);
    event SettingsUpdated(address indexed user, uint256 interval, uint256 gracePeriod);
    event GracePeriodStarted(address indexed user, uint256 timestamp);
    event InactivityTriggered(address indexed user, uint256 timestamp);
    
    /**
     * @dev Submit a heartbeat to reset the inactivity timer
     */
    function submitHeartbeat() external {
        UserHeartbeat storage heartbeat = userHeartbeats[msg.sender];
        heartbeat.lastHeartbeat = block.timestamp;
        heartbeat.isActive = true;
        heartbeat.totalHeartbeats++;
        
        // Store in history
        heartbeatHistory[msg.sender].push(block.timestamp);
        
        emit HeartbeatSubmitted(msg.sender, block.timestamp, heartbeat.totalHeartbeats);
    }
    
    /**
     * @dev Configure heartbeat parameters
     */
    function configureHeartbeat(uint256 _interval, uint256 _gracePeriod) external {
        require(_interval >= 1 days, "Interval must be at least 1 day");
        require(_interval <= 365 days, "Interval cannot exceed 365 days");
        require(_gracePeriod >= 1 days, "Grace period must be at least 1 day");
        require(_gracePeriod <= 180 days, "Grace period cannot exceed 180 days");
        
        UserHeartbeat storage heartbeat = userHeartbeats[msg.sender];
        heartbeat.heartbeatInterval = _interval;
        heartbeat.gracePeriod = _gracePeriod;
        heartbeat.lastHeartbeat = block.timestamp;
        heartbeat.isActive = true;
        
        emit SettingsUpdated(msg.sender, _interval, _gracePeriod);
    }
    
    /**
     * @dev Check if user is in grace period
     */
    function isInGracePeriod(address user) external view returns (bool) {
        UserHeartbeat memory heartbeat = userHeartbeats[user];
        if (!heartbeat.isActive) return false;
        
        uint256 timeSinceHeartbeat = block.timestamp - heartbeat.lastHeartbeat;
        return timeSinceHeartbeat > heartbeat.heartbeatInterval && 
               timeSinceHeartbeat <= (heartbeat.heartbeatInterval + heartbeat.gracePeriod);
    }
    
    /**
     * @dev Check if user is inactive
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
        bool isActive,
        uint256 totalHeartbeats
    ) {
        UserHeartbeat memory heartbeat = userHeartbeats[user];
        return (
            heartbeat.lastHeartbeat,
            heartbeat.heartbeatInterval,
            heartbeat.gracePeriod,
            heartbeat.isActive,
            heartbeat.totalHeartbeats
        );
    }
    
    /**
     * @dev Get heartbeat history
     */
    function getHeartbeatHistory(address user) external view returns (uint256[] memory) {
        return heartbeatHistory[user];
    }
    
    /**
     * @dev Get time until next heartbeat due
     */
    function getTimeUntilDue(address user) external view returns (uint256) {
        UserHeartbeat memory heartbeat = userHeartbeats[user];
        if (!heartbeat.isActive) return 0;
        
        uint256 nextDue = heartbeat.lastHeartbeat + heartbeat.heartbeatInterval;
        if (block.timestamp >= nextDue) return 0;
        
        return nextDue - block.timestamp;
    }
}
