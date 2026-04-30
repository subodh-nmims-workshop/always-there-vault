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
import { createStackNavigator } from '@react-navigation/stack';
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
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_900Black
} from '@expo-google-fonts/outfit';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';

import HomeScreen from './src/screens/HomeScreen';
import AssetsScreen from './src/screens/AssetsScreen';
import BeneficiariesScreen from './src/screens/BeneficiariesScreen';
import HeartbeatScreen from './src/screens/HeartbeatScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProtocolLegalScreen from './src/screens/ProtocolLegalScreen';
import RoadmapScreen from './src/screens/RoadmapScreen';
import SubscriptionScreen from './src/screens/SubscriptionScreen';
import DocsScreen from './src/screens/DocsScreen';
import { COLORS, FONTS, SHADOWS } from './src/theme';
import { useTranslation } from './src/hooks/useTranslation';

LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate`']);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs({ onLogout }: { onLogout: () => void }) {
  const { t } = useTranslation();
  return (
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
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('nav_home').toUpperCase() }} />
      <Tab.Screen name="Assets" component={AssetsScreen} options={{ title: t('nav_assets').toUpperCase() }} />
      <Tab.Screen name="Beneficiaries" component={BeneficiariesScreen} options={{ title: t('nav_beneficiaries').toUpperCase() }} />
      <Tab.Screen name="Heartbeat" component={HeartbeatScreen} options={{ title: t('nav_pulse').toUpperCase() }} />
      <Tab.Screen name="Settings" options={{ title: t('nav_settings').toUpperCase() }}>
        {({ navigation }) => <SettingsScreen navigation={navigation} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

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
          'Outfit_400Regular': Outfit_400Regular,
          'Outfit_500Medium': Outfit_500Medium,
          'Outfit_600SemiBold': Outfit_600SemiBold,
          'Outfit_700Bold': Outfit_700Bold,
          'Outfit_900Black': Outfit_900Black,
          'PlusJakartaSans_400Regular': PlusJakartaSans_400Regular,
          'PlusJakartaSans_500Medium': PlusJakartaSans_500Medium,
          'PlusJakartaSans_600SemiBold': PlusJakartaSans_600SemiBold,
          'PlusJakartaSans_700Bold': PlusJakartaSans_700Bold,
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

  const { t } = useTranslation();

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
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Tabs">
                {(props) => <HomeTabs {...props} onLogout={() => setAppState('landing')} />}
              </Stack.Screen>
              <Stack.Screen name="Subscription" component={SubscriptionScreen} />
              <Stack.Screen name="Roadmap" component={RoadmapScreen} />
              <Stack.Screen name="Legal" component={ProtocolLegalScreen} />
              <Stack.Screen name="Docs" component={DocsScreen} />
            </Stack.Navigator>
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