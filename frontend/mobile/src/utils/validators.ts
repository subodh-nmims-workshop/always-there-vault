/**
 * Professional Validation Utilities
 * Handles all data validation for the mobile app
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validators = {
  /**
   * Validate email address
   */
  validateEmail: (email: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!email) {
      errors.push('Email is required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate wallet address (Ethereum format)
   */
  validateWalletAddress: (address: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!address) {
      errors.push('Wallet address is required');
    } else {
      const addressRegex = /^0x[a-fA-F0-9]{40}$/;
      if (!addressRegex.test(address)) {
        errors.push('Please enter a valid Ethereum wallet address');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate phone number
   */
  validatePhoneNumber: (phone: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!phone) {
      errors.push('Phone number is required');
    } else {
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(phone)) {
        errors.push('Please enter a valid phone number');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate name
   */
  validateName: (name: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!name) {
      errors.push('Name is required');
    } else {
      if (name.length < 2) {
        errors.push('Name must be at least 2 characters long');
      }
      if (name.length > 50) {
        errors.push('Name must be less than 50 characters');
      }
      if (!/^[a-zA-Z\s\-'\.]+$/.test(name)) {
        errors.push('Name can only contain letters, spaces, hyphens, apostrophes, and periods');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate heartbeat interval
   */
  validateHeartbeatInterval: (days: number): ValidationResult => {
    const errors: string[] = [];
    
    if (!days || days < 1) {
      errors.push('Heartbeat interval must be at least 1 day');
    } else if (days > 365) {
      errors.push('Heartbeat interval cannot exceed 365 days');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate grace period
   */
  validateGracePeriod: (days: number): ValidationResult => {
    const errors: string[] = [];
    
    if (!days || days < 1) {
      errors.push('Grace period must be at least 1 day');
    } else if (days > 180) {
      errors.push('Grace period cannot exceed 180 days');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate release delay
   */
  validateReleaseDelay: (days: number): ValidationResult => {
    const errors: string[] = [];
    
    if (days < 0) {
      errors.push('Release delay cannot be negative');
    } else if (days > 3650) { // 10 years
      errors.push('Release delay cannot exceed 10 years');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate asset name
   */
  validateAssetName: (name: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!name) {
      errors.push('Asset name is required');
    } else {
      if (name.length < 3) {
        errors.push('Asset name must be at least 3 characters long');
      }
      if (name.length > 100) {
        errors.push('Asset name must be less than 100 characters');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate asset description
   */
  validateAssetDescription: (description: string): ValidationResult => {
    const errors: string[] = [];
    
    if (description && description.length > 500) {
      errors.push('Description must be less than 500 characters');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate file size
   */
  validateFileSize: (sizeInBytes: number, maxSizeInMB: number = 100): ValidationResult => {
    const errors: string[] = [];
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    
    if (sizeInBytes > maxSizeInBytes) {
      errors.push(`File size cannot exceed ${maxSizeInMB}MB`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate file type
   */
  validateFileType: (fileName: string, allowedTypes: string[]): ValidationResult => {
    const errors: string[] = [];
    
    if (!fileName) {
      errors.push('File name is required');
      return { isValid: false, errors };
    }
    
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    
    if (!fileExtension) {
      errors.push('File must have an extension');
    } else if (!allowedTypes.includes(fileExtension)) {
      errors.push(`File type .${fileExtension} is not allowed. Allowed types: ${allowedTypes.join(', ')}`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate password strength
   */
  validatePassword: (password: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!password) {
      errors.push('Password is required');
    } else {
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Password must contain at least one special character');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate beneficiary data
   */
  validateBeneficiary: (beneficiary: {
    name: string;
    email?: string;
    phone?: string;
    walletAddress: string;
  }): ValidationResult => {
    const errors: string[] = [];
    
    const nameValidation = validators.validateName(beneficiary.name);
    if (!nameValidation.isValid) {
      errors.push(...nameValidation.errors);
    }
    
    const walletValidation = validators.validateWalletAddress(beneficiary.walletAddress);
    if (!walletValidation.isValid) {
      errors.push(...walletValidation.errors);
    }
    
    if (beneficiary.email) {
      const emailValidation = validators.validateEmail(beneficiary.email);
      if (!emailValidation.isValid) {
        errors.push(...emailValidation.errors);
      }
    }
    
    if (beneficiary.phone) {
      const phoneValidation = validators.validatePhoneNumber(beneficiary.phone);
      if (!phoneValidation.isValid) {
        errors.push(...phoneValidation.errors);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate asset creation data
   */
  validateAssetCreation: (asset: {
    name: string;
    description?: string;
    type: string;
    fileSize?: number;
    fileName?: string;
    beneficiaries: string[];
    releaseDelay: number;
  }): ValidationResult => {
    const errors: string[] = [];
    
    const nameValidation = validators.validateAssetName(asset.name);
    if (!nameValidation.isValid) {
      errors.push(...nameValidation.errors);
    }
    
    if (asset.description) {
      const descValidation = validators.validateAssetDescription(asset.description);
      if (!descValidation.isValid) {
        errors.push(...descValidation.errors);
      }
    }
    
    if (!asset.type) {
      errors.push('Asset type is required');
    }
    
    if (asset.beneficiaries.length === 0) {
      errors.push('At least one beneficiary is required');
    }
    
    const releaseDelayValidation = validators.validateReleaseDelay(asset.releaseDelay);
    if (!releaseDelayValidation.isValid) {
      errors.push(...releaseDelayValidation.errors);
    }
    
    if (asset.fileSize) {
      const fileSizeValidation = validators.validateFileSize(asset.fileSize);
      if (!fileSizeValidation.isValid) {
        errors.push(...fileSizeValidation.errors);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate URL
   */
  validateUrl: (url: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!url) {
      errors.push('URL is required');
    } else {
      try {
        new URL(url);
      } catch {
        errors.push('Please enter a valid URL');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate date range
   */
  validateDateRange: (startDate: Date, endDate: Date): ValidationResult => {
    const errors: string[] = [];
    
    if (startDate >= endDate) {
      errors.push('End date must be after start date');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate required fields
   */
  validateRequired: (fields: Record<string, any>): ValidationResult => {
    const errors: string[] = [];
    
    Object.entries(fields).forEach(([fieldName, value]) => {
      if (value === null || value === undefined || value === '') {
        errors.push(`${fieldName} is required`);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate array length
   */
  validateArrayLength: (
    array: any[], 
    fieldName: string, 
    min?: number, 
    max?: number
  ): ValidationResult => {
    const errors: string[] = [];
    
    if (min !== undefined && array.length < min) {
      errors.push(`${fieldName} must have at least ${min} item${min > 1 ? 's' : ''}`);
    }
    
    if (max !== undefined && array.length > max) {
      errors.push(`${fieldName} cannot have more than ${max} item${max > 1 ? 's' : ''}`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

export default validators;