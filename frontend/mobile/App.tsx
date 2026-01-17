import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Services
import BiometricService from './src/services/BiometricService';
import CryptoService from './src/services/CryptoService';
import StorageService from './src/services/StorageService';

// Import Screens
import HomeScreen from './src/screens/HomeScreen';
import AssetsScreen from './src/screens/AssetsScreen';
import BeneficiariesScreen from './src/screens/BeneficiariesScreen';
import HeartbeatScreen from './src/screens/HeartbeatScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Import Types
import { RootStackParamList } from './src/types';

const Tab = createBottomTabNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [biometricCapabilities, setBiometricCapabilities] = useState<any>(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Request permissions on Android
      if (Platform.OS === 'android') {
        await requestAndroidPermissions();
      }

      // Initialize services
      const biometricService = BiometricService.getInstance();
      const cryptoService = CryptoService.getInstance();
      const storageService = StorageService.getInstance();

      // Check biometric capabilities
      const capabilities = await biometricService.checkBiometricCapabilities();
      setBiometricCapabilities(capabilities);

      // Check if this is first launch
      const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
      if (isFirstLaunch === null) {
        await AsyncStorage.setItem('isFirstLaunch', 'false');
        // Show onboarding or setup wizard
        showWelcomeMessage();
      }

      setIsInitialized(true);
    } catch (error) {
      console.error('App initialization failed:', error);
      Alert.alert(
        'Initialization Error',
        'Failed to initialize the app. Please restart the application.',
        [{ text: 'OK' }]
      );
    }
  };

  const requestAndroidPermissions = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ];

      await PermissionsAndroid.requestMultiple(permissions);
    } catch (error) {
      console.warn('Permission request failed:', error);
    }
  };

  const showWelcomeMessage = () => {
    Alert.alert(
      'Welcome to Digital Will Protocol',
      'Your decentralized, secure digital inheritance system. Your data is encrypted client-side and never leaves your control.',
      [
        {
          text: 'Get Started',
          onPress: () => {
            if (biometricCapabilities?.available) {
              Alert.alert(
                'Biometric Security',
                `${biometricCapabilities.biometryType} is available. Would you like to enable it for enhanced security?`,
                [
                  { text: 'Later', style: 'cancel' },
                  { text: 'Enable', onPress: setupBiometrics },
                ]
              );
            }
          },
        },
      ]
    );
  };

  const setupBiometrics = async () => {
    try {
      const biometricService = BiometricService.getInstance();
      const result = await biometricService.createBiometricKeys();
      
      if (result.success) {
        Alert.alert('Success', 'Biometric authentication has been enabled.');
      } else {
        Alert.alert('Error', result.error || 'Failed to setup biometric authentication.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to setup biometric authentication.');
    }
  };

  if (!isInitialized) {
    // You could show a splash screen here
    return <></>;
  }

  return (
    <NavigationContainer>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#f8f9fa" 
        translucent={false}
      />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Assets':
                iconName = 'folder';
                break;
              case 'Beneficiaries':
                iconName = 'people';
                break;
              case 'Heartbeat':
                iconName = 'favorite';
                break;
              case 'Settings':
                iconName = 'settings';
                break;
              default:
                iconName = 'help';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: '#6b7280',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e5e7eb',
            borderTopWidth: 1,
            paddingBottom: Platform.OS === 'ios' ? 20 : 5,
            paddingTop: 5,
            height: Platform.OS === 'ios' ? 85 : 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: '#ffffff',
            borderBottomColor: '#e5e7eb',
            borderBottomWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#1f2937',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            title: 'Digital Will',
            headerTitle: 'Digital Will Protocol'
          }}
        />
        <Tab.Screen 
          name="Assets" 
          component={AssetsScreen}
          options={{ 
            title: 'Assets',
            headerTitle: 'My Digital Assets'
          }}
        />
        <Tab.Screen 
          name="Beneficiaries" 
          component={BeneficiariesScreen}
          options={{ 
            title: 'Beneficiaries',
            headerTitle: 'Beneficiaries'
          }}
        />
        <Tab.Screen 
          name="Heartbeat" 
          component={HeartbeatScreen}
          options={{ 
            title: 'Heartbeat',
            headerTitle: 'Proof of Life'
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ 
            title: 'Settings',
            headerTitle: 'Settings'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;