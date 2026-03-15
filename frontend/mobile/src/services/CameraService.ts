import * as ImagePicker from 'expo-image-picker';

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
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  }

  async capturePhoto(): Promise<ImagePicker.ImagePickerResult | null> {
    const hasPermission = await this.requestCameraPermission();
    if (!hasPermission) return null;

    return await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: true,
    });
  }

  async captureVideo(): Promise<ImagePicker.ImagePickerResult | null> {
    const hasPermission = await this.requestCameraPermission();
    if (!hasPermission) return null;

    return await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 0.8,
      videoMaxDuration: 60,
    });
  }

  async pickFromGallery(): Promise<ImagePicker.ImagePickerResult | null> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return null;

    return await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.8,
      base64: true,
    });
  }

  async pickMultipleFromGallery(): Promise<ImagePicker.ImagePickerResult | null> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return null;

    return await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.8,
      allowsMultipleSelection: true,
      selectionLimit: 10,
    });
  }
}

export default CameraService;
