import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  StatusBar, 
  ActivityIndicator,
  LogBox
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import { 
  Shield, 
  Folder, 
  Users, 
  Zap, 
  Settings,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Google Fonts Packages ────────────────────────────────────────────────────
import { 
  Orbitron_400Regular, 
  Orbitron_500Medium, 
  Orbitron_700Bold, 
  Orbitron_900Black 
} from '@expo-google-fonts/orbitron';
import { 
  Inter_400Regular, 
  Inter_500Medium, 
  Inter_600SemiBold,
  Inter_700Bold, 
  Inter_900Black 
} from '@expo-google-fonts/inter';

import HomeScreen from './src/screens/HomeScreen';
import AssetsScreen from './src/screens/AssetsScreen';
import BeneficiariesScreen from './src/screens/BeneficiariesScreen';
import HeartbeatScreen from './src/screens/HeartbeatScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import { COLORS, FONTS, SHADOWS } from './src/theme';

LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate`']);

const Tab = createBottomTabNavigator();

// ─── Error Boundary ───────────────────────────────────────────────────────────
interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('PROTOCOL KERNEL CRASH:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.loadingContainer}>
          <Shield size={64} color={COLORS.error} />
          <Text style={[styles.splashTitle, { marginTop: 20 }]}>KERNEL CRASH</Text>
          <Text style={styles.splashSubtitle}>EMERGENCY REBOOT REQUIRED</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [appState, setAppState] = useState<'splash' | 'landing' | 'login' | 'setup_security' | 'unlock' | 'home'>('splash');

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts directly from installed npm packages to fix "Cannot find module" errors
        await Font.loadAsync({
          'Orbitron_400Regular': Orbitron_400Regular,
          'Orbitron_500Medium': Orbitron_500Medium,
          'Orbitron_700Bold': Orbitron_700Bold,
          'Orbitron_900Black': Orbitron_900Black,
          'Inter_400Regular': Inter_400Regular,
          'Inter_500Medium': Inter_500Medium,
          'Inter_600SemiBold': Inter_600SemiBold,
          'Inter_700Bold': Inter_700Bold,
          'Inter_900Black': Inter_900Black,
        });
        
        // 1. Initial State Handling
        const savedWallet = await AsyncStorage.getItem('dwp_wallet_address');
        const setupDone = await AsyncStorage.getItem('dwp_setup_complete');
        
        if (savedWallet && setupDone) {
          setAppState('unlock');
        } else if (savedWallet && !setupDone) {
          setAppState('setup_security');
        } else {
          setAppState('landing');
        }
        setFontsLoaded(true);
      } catch (e) {
        console.warn('Protocol bootstrap warning:', e);
        setFontsLoaded(true);
        setAppState('landing');
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded || appState === 'splash') {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="light-content" />
        <Shield size={80} color={COLORS.primary} style={styles.splashLogo} />
        <Text style={styles.splashTitle}>DEADMAN</Text>
        <Text style={styles.splashSubtitle}>PROTOCOL</Text>
        <ActivityIndicator size="small" color={COLORS.primary} style={{ marginTop: 40 }} />
      </View>
    );
  }

  const renderContent = () => {
    switch (appState) {
      case 'landing':
        return <LandingScreen onConnectWallet={() => setAppState('login')} />;
      case 'login':
        return (
          <LoginScreen 
            mode="wallet_auth" 
            onBack={() => setAppState('landing')}
            onSuccess={() => setAppState('setup_security')}
          />
        );
      case 'setup_security':
        return (
          <LoginScreen 
            mode="setup_security" 
            onSuccess={async () => {
              await AsyncStorage.setItem('dwp_setup_complete', 'true');
              setAppState('home');
            }} 
          />
        );
      case 'unlock':
        return <LoginScreen mode="app_unlock" onSuccess={() => setAppState('home')} />;
      case 'home':
        return (
          <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => {
                    const iconConfig = {
                      Home: Shield,
                      Assets: Folder,
                      Beneficiaries: Users,
                      Heartbeat: Zap,
                      Settings: Settings,
                    };
                    const IconComp = iconConfig[route.name as keyof typeof iconConfig] || Shield;
                    return <IconComp size={size} color={color} />;
                  },
                  tabBarActiveTintColor: COLORS.primary,
                  tabBarInactiveTintColor: COLORS.textDim,
                  tabBarStyle: {
                    backgroundColor: COLORS.background,
                    borderTopColor: COLORS.border,
                    height: 85,
                    paddingBottom: 25,
                    paddingTop: 10,
                    position: 'absolute',
                  },
                  tabBarBackground: () => (
                    <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: COLORS.glass, borderTopWidth: 1, borderTopColor: COLORS.glassBorder }} />
                  ),
                  tabBarLabelStyle: {
                    fontFamily: FONTS.orbitron.bold,
                    fontSize: 8,
                    letterSpacing: 1,
                  },
                })}
              >
                <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'OVERVIEW' }} />
                <Tab.Screen name="Assets" component={AssetsScreen} options={{ title: 'ASSETS' }} />
                <Tab.Screen name="Beneficiaries" component={BeneficiariesScreen} options={{ title: 'PROTEGE' }} />
                <Tab.Screen name="Heartbeat" component={HeartbeatScreen} options={{ title: 'PULSE' }} />
                <Tab.Screen name="Settings" options={{ title: 'CONFIG' }}>
                  {() => <SettingsScreen onLogout={() => setAppState('landing')} />}
                </Tab.Screen>
              </Tab.Navigator>
          </NavigationContainer>
        );
      default:
        return <LandingScreen onConnectWallet={() => setAppState('login')} />;
    }
  };

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
          <StatusBar barStyle="light-content" />
          {renderContent()}
        </View>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    marginBottom: 30,
    ...SHADOWS.blue
  },
  splashTitle: {
    color: COLORS.text,
    fontFamily: FONTS.orbitron.black,
    fontSize: 28,
    letterSpacing: 3,
  },
  splashSubtitle: {
    color: '#3b82f6',
    fontFamily: FONTS.inter.bold,
    fontSize: 12,
    letterSpacing: 4,
    marginTop: 10,
  },
});