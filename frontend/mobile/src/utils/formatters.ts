/**
 * Professional Formatting Utilities
 * Handles all data formatting for the mobile app
 */

export const formatters = {
  /**
   * Format wallet address for display
   */
  formatAddress: (address: string): string => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  },

  /**
   * Format file size in human readable format
   */
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  /**
   * Format date for display
   */
  formatDate: (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  /**
   * Format date and time for display
   */
  formatDateTime: (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  /**
   * Format time ago (relative time)
   */
  formatTimeAgo: (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  },

  /**
   * Format duration in days
   */
  formatDuration: (days: number): string => {
    if (days === 0) return 'Immediate';
    if (days === 1) return '1 day';
    if (days < 7) return `${days} days`;
    if (days < 30) {
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;
      if (remainingDays === 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''}`;
      }
      return `${weeks} week${weeks > 1 ? 's' : ''} ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
    }
    if (days < 365) {
      const months = Math.floor(days / 30);
      const remainingDays = days % 30;
      if (remainingDays === 0) {
        return `${months} month${months > 1 ? 's' : ''}`;
      }
      return `${months} month${months > 1 ? 's' : ''} ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
    }
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    if (remainingDays === 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    }
    return `${years} year${years > 1 ? 's' : ''} ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
  },

  /**
   * Format asset type for display
   */
  formatAssetType: (type: string): string => {
    const typeMap: Record<string, string> = {
      'crypto_keys': 'Crypto Keys',
      'audio_message': 'Audio Message',
      'photo': 'Photo',
      'video': 'Video',
      'letter': 'Letter',
      'document': 'Document',
      'business_secret': 'Business Secret',
      'intelligence': 'Intelligence Data',
      'military_evidence': 'Military Evidence',
      'other': 'Other'
    };
    
    return typeMap[type] || type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  },

  /**
   * Format sensitivity level
   */
  formatSensitivity: (level: string): { text: string; color: string } => {
    const sensitivityMap: Record<string, { text: string; color: string }> = {
      'low': { text: 'Low', color: '#10b981' },
      'medium': { text: 'Medium', color: '#f59e0b' },
      'high': { text: 'High', color: '#ef4444' },
      'critical': { text: 'Critical', color: '#dc2626' }
    };
    
    return sensitivityMap[level] || { text: level, color: '#6b7280' };
  },

  /**
   * Format heartbeat status
   */
  formatHeartbeatStatus: (status: string): { text: string; color: string } => {
    const statusMap: Record<string, { text: string; color: string }> = {
      'active': { text: 'Active', color: '#10b981' },
      'grace_period': { text: 'Grace Period', color: '#f59e0b' },
      'triggered': { text: 'Triggered', color: '#ef4444' },
      'emergency_override': { text: 'Emergency Override', color: '#dc2626' }
    };
    
    return statusMap[status] || { text: status, color: '#6b7280' };
  },

  /**
   * Format percentage
   */
  formatPercentage: (value: number, decimals: number = 1): string => {
    return `${value.toFixed(decimals)}%`;
  },

  /**
   * Format currency (for future crypto integration)
   */
  formatCurrency: (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  /**
   * Format crypto amount
   */
  formatCrypto: (amount: number, symbol: string = 'ETH', decimals: number = 4): string => {
    return `${amount.toFixed(decimals)} ${symbol}`;
  },

  /**
   * Truncate text with ellipsis
   */
  truncateText: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  },

  /**
   * Format phone number
   */
  formatPhoneNumber: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  },

  /**
   * Format email for display (mask middle part)
   */
  formatEmailForDisplay: (email: string): string => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 3) return email;
    
    const visibleStart = localPart.substring(0, 2);
    const visibleEnd = localPart.substring(localPart.length - 1);
    const masked = '*'.repeat(Math.max(1, localPart.length - 3));
    
    return `${visibleStart}${masked}${visibleEnd}@${domain}`;
  },

  /**
   * Format hash for display
   */
  formatHash: (hash: string, startChars: number = 8, endChars: number = 8): string => {
    if (hash.length <= startChars + endChars) return hash;
    return `${hash.substring(0, startChars)}...${hash.substring(hash.length - endChars)}`;
  },

  /**
   * Format number with commas
   */
  formatNumber: (num: number): string => {
    return num.toLocaleString('en-US');
  },

  /**
   * Format boolean as Yes/No
   */
  formatBoolean: (value: boolean): string => {
    return value ? 'Yes' : 'No';
  },

  /**
   * Format array as comma-separated string
   */
  formatArray: (arr: string[], maxItems: number = 3): string => {
    if (arr.length === 0) return 'None';
    if (arr.length <= maxItems) return arr.join(', ');
    
    const visible = arr.slice(0, maxItems);
    const remaining = arr.length - maxItems;
    return `${visible.join(', ')} and ${remaining} more`;
  }
};

export default formatters;