import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';

class CameraService {
  private static instance: CameraService;

  private constructor() {}

  public static getInstance(): CameraService {
    if (!CameraService.instance) {
      CameraService.instance = new CameraService();
    }
    return CameraService.instance;
  }

  async requestCameraPermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'DeadMan Protocol needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  }

  async capturePhoto(): Promise<ImagePickerResponse | null> {
    const hasPermission = await this.requestCameraPermission();
    if (!hasPermission) {
      return null;
    }

    return new Promise((resolve) => {
      launchCamera(
        {
          mediaType: 'photo',
          quality: 0.8,
          maxWidth: 1920,
          maxHeight: 1920,
          includeBase64: true,
        },
        (response) => {
          if (response.didCancel) {
            resolve(null);
          } else if (response.errorCode) {
            console.error('Camera error:', response.errorMessage);
            resolve(null);
          } else {
            resolve(response);
          }
        },
      );
    });
  }

  async captureVideo(): Promise<ImagePickerResponse | null> {
    const hasPermission = await this.requestCameraPermission();
    if (!hasPermission) {
      return null;
    }

    return new Promise((resolve) => {
      launchCamera(
        {
          mediaType: 'video',
          videoQuality: 'high',
          durationLimit: 60, // 60 seconds max
        },
        (response) => {
          if (response.didCancel) {
            resolve(null);
          } else if (response.errorCode) {
            console.error('Camera error:', response.errorMessage);
            resolve(null);
          } else {
            resolve(response);
          }
        },
      );
    });
  }

  async pickFromGallery(): Promise<ImagePickerResponse | null> {
    return new Promise((resolve) => {
      launchImageLibrary(
        {
          mediaType: 'mixed',
          quality: 0.8,
          includeBase64: true,
        },
        (response) => {
          if (response.didCancel) {
            resolve(null);
          } else if (response.errorCode) {
            console.error('Gallery error:', response.errorMessage);
            resolve(null);
          } else {
            resolve(response);
          }
        },
      );
    });
  }

  async pickMultipleFromGallery(): Promise<ImagePickerResponse | null> {
    return new Promise((resolve) => {
      launchImageLibrary(
        {
          mediaType: 'mixed',
          quality: 0.8,
          selectionLimit: 10,
          includeBase64: false,
        },
        (response) => {
          if (response.didCancel) {
            resolve(null);
          } else if (response.errorCode) {
            console.error('Gallery error:', response.errorMessage);
            resolve(null);
          } else {
            resolve(response);
          }
        },
      );
    });
  }
}

export default CameraService;
