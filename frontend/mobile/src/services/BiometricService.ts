import ReactNativeBiometrics from 'react-native-biometrics';

class BiometricService {
  private static instance: BiometricService;
  private rnBiometrics: ReactNativeBiometrics;

  private constructor() {
    this.rnBiometrics = new ReactNativeBiometrics();
  }

  public static getInstance(): BiometricService {
    if (!BiometricService.instance) {
      BiometricService.instance = new BiometricService();
    }
    return BiometricService.instance;
  }

  async isBiometricAvailable(): Promise<{ available: boolean; biometryType: string }> {
    try {
      const { available, biometryType } = await this.rnBiometrics.isSensorAvailable();
      return { available, biometryType: biometryType || 'none' };
    } catch (error) {
      console.error('Biometric check failed:', error);
      return { available: false, biometryType: 'none' };
    }
  }

  async authenticate(promptMessage: string = 'Authenticate to continue'): Promise<boolean> {
    try {
      const { success } = await this.rnBiometrics.simplePrompt({
        promptMessage,
        cancelButtonText: 'Cancel',
      });
      return success;
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      return false;
    }
  }

  async createKeys(): Promise<{ publicKey: string } | null> {
    try {
      const { publicKey } = await this.rnBiometrics.createKeys();
      return { publicKey };
    } catch (error) {
      console.error('Key creation failed:', error);
      return null;
    }
  }

  async deleteKeys(): Promise<boolean> {
    try {
      const { keysDeleted } = await this.rnBiometrics.deleteKeys();
      return keysDeleted;
    } catch (error) {
      console.error('Key deletion failed:', error);
      return false;
    }
  }

  async createSignature(payload: string): Promise<{ signature: string } | null> {
    try {
      const { success, signature } = await this.rnBiometrics.createSignature({
        promptMessage: 'Sign to authenticate',
        payload,
      });

      if (success && signature) {
        return { signature };
      }
      return null;
    } catch (error) {
      console.error('Signature creation failed:', error);
      return null;
    }
  }
}

export default BiometricService;
