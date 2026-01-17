/**
 * Professional Biometric Authentication Service
 * Handles fingerprint, face ID, and other biometric authentication
 */

import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface BiometricCapabilities {
  available: boolean;
  biometryType: string | null;
  error?: string;
}

export interface BiometricAuthResult {
  success: boolean;
  signature?: string;
  error?: string;
}

class BiometricService {
  private static instance: BiometricService;
  private rnBiometrics: ReactNativeBiometrics;

  constructor() {
    this.rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true
    });
  }

  public static getInstance(): BiometricService {
    if (!BiometricService.instance) {
      BiometricService.instance = new BiometricService();
    }
    return BiometricService.instance;
  }

  /**
   * Check if biometric authentication is available
   */
  async checkBiometricCapabilities(): Promise<BiometricCapabilities> {
    try {
      const { available, biometryType } = await this.rnBiometrics.isSensorAvailable();
      
      return {
        available,
        biometryType,
      };
    } catch (error) {
      return {
        available: false,
        biometryType: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Create biometric keys for secure authentication
   */
  async createBiometricKeys(): Promise<{ success: boolean; publicKey?: string; error?: string }> {
    try {
      const { keysExist } = await this.rnBiometrics.biometricKeysExist();
      
      if (!keysExist) {
        const { publicKey } = await this.rnBiometrics.createKeys();
        await AsyncStorage.setItem('biometric_public_key', publicKey);
        return { success: true, publicKey };
      }
      
      const publicKey = await AsyncStorage.getItem('biometric_public_key');
      return { success: true, publicKey: publicKey || undefined };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create biometric keys'
      };
    }
  }

  /**
   * Authenticate using biometrics
   */
  async authenticateWithBiometrics(
    promptMessage: string = 'Authenticate to access your Digital Will'
  ): Promise<BiometricAuthResult> {
    try {
      const { available } = await this.checkBiometricCapabilities();
      
      if (!available) {
        return {
          success: false,
          error: 'Biometric authentication not available'
        };
      }

      const { keysExist } = await this.rnBiometrics.biometricKeysExist();
      
      if (!keysExist) {
        const keyResult = await this.createBiometricKeys();
        if (!keyResult.success) {
          return {
            success: false,
            error: keyResult.error
          };
        }
      }

      const epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString();
      const payload = `${epochTimeSeconds}_digital_will_auth`;

      const { success, signature } = await this.rnBiometrics.createSignature({
        promptMessage,
        payload
      });

      return {
        success,
        signature: signature || undefined
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Biometric authentication failed'
      };
    }
  }

  /**
   * Authenticate for heartbeat recording
   */
  async authenticateForHeartbeat(): Promise<BiometricAuthResult> {
    return this.authenticateWithBiometrics(
      'Authenticate to record your heartbeat and prove you\'re still active'
    );
  }

  /**
   * Authenticate for asset access
   */
  async authenticateForAssetAccess(): Promise<BiometricAuthResult> {
    return this.authenticateWithBiometrics(
      'Authenticate to access your encrypted digital assets'
    );
  }

  /**
   * Authenticate for sensitive operations
   */
  async authenticateForSensitiveOperation(operation: string): Promise<BiometricAuthResult> {
    return this.authenticateWithBiometrics(
      `Authenticate to ${operation}`
    );
  }

  /**
   * Delete biometric keys
   */
  async deleteBiometricKeys(): Promise<{ success: boolean; error?: string }> {
    try {
      const { keysExist } = await this.rnBiometrics.biometricKeysExist();
      
      if (keysExist) {
        await this.rnBiometrics.deleteKeys();
      }
      
      await AsyncStorage.removeItem('biometric_public_key');
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete biometric keys'
      };
    }
  }

  /**
   * Check if biometric keys exist
   */
  async biometricKeysExist(): Promise<boolean> {
    try {
      const { keysExist } = await this.rnBiometrics.biometricKeysExist();
      return keysExist;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get biometric type string for UI display
   */
  getBiometricTypeString(biometryType: string | null): string {
    switch (biometryType) {
      case 'TouchID':
        return 'Touch ID';
      case 'FaceID':
        return 'Face ID';
      case 'Biometrics':
        return 'Fingerprint';
      default:
        return 'Biometric Authentication';
    }
  }

  /**
   * Verify biometric signature
   */
  async verifySignature(signature: string, payload: string): Promise<boolean> {
    try {
      const { success } = await this.rnBiometrics.verifySignature({
        signature,
        payload
      });
      
      return success;
    } catch (error) {
      return false;
    }
  }
}

export default BiometricService;