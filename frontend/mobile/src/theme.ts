import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  background: '#020617', // Slate 950
  surface: 'rgba(15, 23, 42, 0.4)', // Slate 900/40
  surfaceLight: 'rgba(30, 41, 59, 0.4)', // Slate 800/40
  primary: '#3b82f6', // Blue 500
  primaryGlow: 'rgba(59, 130, 246, 0.3)',
  secondary: '#8b5cf6', // Violet 500
  secondaryGlow: 'rgba(139, 92, 246, 0.3)',
  accent: '#10b981', // Emerald 500
  accentGlow: 'rgba(16, 185, 129, 0.2)',
  error: '#ef4444', // Red 500
  warning: '#f59e0b', // Amber 500
  text: '#f8fafc', // Slate 50
  textMuted: '#94a3b8', // Slate 400
  textDim: '#64748b', // Slate 500
  border: 'rgba(30, 41, 59, 0.8)', // Slate 800
  borderLight: 'rgba(51, 65, 85, 0.5)', // Slate 700/50
  glass: 'rgba(15, 23, 42, 0.8)',
  glassBorder: 'rgba(255, 255, 255, 0.05)',
};

export const FONTS = {
  orbitron: {
    black: 'Orbitron_900Black',
    bold: 'Orbitron_700Bold',
    medium: 'Orbitron_500Medium',
    regular: 'Orbitron_400Regular',
  },
  inter: {
    black: 'Inter_900Black',
    bold: 'Inter_700Bold',
    semibold: 'Inter_600SemiBold',
    medium: 'Inter_500Medium',
    regular: 'Inter_400Regular',
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
