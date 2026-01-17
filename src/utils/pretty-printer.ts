/**
 * Configuration pretty-printer for JSON formatting
 * Ensures output is valid and properly formatted
 */

import { UserConfig, DigitalAsset, BeneficiaryRule } from '../types';

export interface PrettyPrintOptions {
  indent: number;
  sortKeys: boolean;
  includeComments: boolean;
}

const DEFAULT_OPTIONS: PrettyPrintOptions = {
  indent: 2,
  sortKeys: true,
  includeComments: false
};

/**
 * Pretty prints a configuration object to formatted JSON
 */
export function prettyPrintConfig(config: any, options: PrettyPrintOptions = DEFAULT_OPTIONS): string {
  try {
    if (options.sortKeys) {
      config = sortObjectKeys(config);
    }
    
    const jsonString = JSON.stringify(config, null, options.indent);
    
    if (options.includeComments) {
      return addConfigComments(jsonString);
    }
    
    return jsonString;
  } catch (error) {
    throw new Error(`Pretty printing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Pretty prints a UserConfig object with validation
 */
export function prettyPrintUserConfig(config: UserConfig, options: PrettyPrintOptions = DEFAULT_OPTIONS): string {
  const configWithMetadata = {
    ...config,
    _metadata: {
      type: 'UserConfig',
      version: '1.0.0',
      lastModified: new Date().toISOString()
    }
  };
  
  return prettyPrintConfig(configWithMetadata, options);
}

/**
 * Pretty prints a DigitalAsset object
 */
export function prettyPrintDigitalAsset(asset: DigitalAsset, options: PrettyPrintOptions = DEFAULT_OPTIONS): string {
  const assetWithMetadata = {
    ...asset,
    _metadata: {
      type: 'DigitalAsset',
      version: '1.0.0',
      lastModified: new Date().toISOString()
    }
  };
  
  return prettyPrintConfig(assetWithMetadata, options);
}

/**
 * Recursively sorts object keys for consistent output
 */
function sortObjectKeys(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }
  
  const sortedObj: any = {};
  const keys = Object.keys(obj).sort();
  
  for (const key of keys) {
    sortedObj[key] = sortObjectKeys(obj[key]);
  }
  
  return sortedObj;
}

/**
 * Adds helpful comments to configuration JSON
 */
function addConfigComments(jsonString: string): string {
  // Note: JSON doesn't support comments, so this would need to be JSONC or YAML
  // For now, we'll just return the original JSON
  return jsonString;
}

/**
 * Validates that pretty-printed JSON can be parsed back correctly
 */
export function validatePrettyPrintRoundTrip(original: any): boolean {
  try {
    const prettyPrinted = prettyPrintConfig(original);
    const parsed = JSON.parse(prettyPrinted);
    
    // Remove metadata for comparison if it was added
    if (parsed._metadata) {
      delete parsed._metadata;
    }
    
    // Deep comparison of objects
    return deepEqual(original, parsed);
  } catch (error) {
    return false;
  }
}

/**
 * Deep equality comparison for objects
 */
function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  }
  
  if (obj1 == null || obj2 == null) {
    return obj1 === obj2;
  }
  
  if (typeof obj1 !== typeof obj2) {
    return false;
  }
  
  if (typeof obj1 !== 'object') {
    return obj1 === obj2;
  }
  
  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    return false;
  }
  
  if (Array.isArray(obj1)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) {
        return false;
      }
    }
    return true;
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  
  return true;
}