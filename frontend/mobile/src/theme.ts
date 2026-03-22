import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  background: '#0a0c10', // Slate 950 deep
  surface: 'rgba(255, 255, 255, 0.03)', 
  surfaceLight: 'rgba(255, 255, 255, 0.08)', 
  primary: '#1152d4', // Premium Blue
  primaryGlow: 'rgba(17, 82, 212, 0.3)',
  secondary: '#8b5cf6', // Violet
  secondaryGlow: 'rgba(139, 92, 246, 0.3)',
  accent: '#10b981', 
  accentGlow: 'rgba(16, 185, 129, 0.2)',
  error: '#ef4444', 
  warning: '#f59e0b', 
  text: '#ffffff', 
  textMuted: '#94a3b8', 
  textDim: '#475569', 
  border: 'rgba(255, 255, 255, 0.08)', 
  borderLight: 'rgba(255, 255, 255, 0.15)', 
  glass: 'rgba(10, 12, 16, 0.85)',
  glassBorder: 'rgba(255, 255, 255, 0.05)',
};

export const FONTS = {
  orbitron: {
    black: 'Outfit_900Black',
    bold: 'Outfit_700Bold',
    semibold: 'Outfit_600SemiBold',
    medium: 'Outfit_500Medium',
    regular: 'Outfit_400Regular',
  },
  inter: {
    black: 'PlusJakartaSans_700Bold',
    bold: 'PlusJakartaSans_700Bold',
    semibold: 'PlusJakartaSans_600SemiBold',
    medium: 'PlusJakartaSans_500Medium',
    regular: 'PlusJakartaSans_400Regular',
  }
};

export const GAPS = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  full: 9999,
};

export const SHADOWS = {
  blue: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  purple: {
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  green: {
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  }
};

export const LAYOUT = {
  width,
  height,
  isSmallDevice: width < 375,
};
