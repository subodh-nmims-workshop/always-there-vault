import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View
} from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOWS } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: any;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: IconComp,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...styles[`button_${size}`],
      ...(fullWidth && styles.fullWidth),
    };

    switch (variant) {
      case 'primary': return { ...baseStyle, ...styles.primaryButton };
      case 'secondary': return { ...baseStyle, ...styles.secondaryButton };
      case 'outline': return { ...baseStyle, ...styles.outlineButton };
      case 'ghost': return { ...baseStyle, ...styles.ghostButton };
      case 'danger': return { ...baseStyle, ...styles.dangerButton };
      default: return { ...baseStyle, ...styles.primaryButton };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...styles.buttonText,
      ...styles[`buttonText_${size}`],
    };

    switch (variant) {
      case 'primary': return { ...baseStyle, ...styles.primaryButtonText };
      case 'secondary': return { ...baseStyle, ...styles.secondaryButtonText };
      case 'outline': return { ...baseStyle, ...styles.outlineButtonText };
      case 'ghost': return { ...baseStyle, ...styles.ghostButtonText };
      case 'danger': return { ...baseStyle, ...styles.dangerButtonText };
      default: return { ...baseStyle, ...styles.primaryButtonText };
    }
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        isDisabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? COLORS.primary : '#ffffff'}
        />
      ) : (
        <>
          {IconComp && iconPosition === 'left' && (
            <View style={styles.iconLeft}>
              <IconComp size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} color={getTextStyle().color} />
            </View>
          )}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {IconComp && iconPosition === 'right' && (
            <View style={styles.iconRight}>
              <IconComp size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} color={getTextStyle().color} />
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  button_sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
    borderRadius: RADIUS.md,
  },
  button_md: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 48,
  },
  button_lg: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    minHeight: 56,
    borderRadius: RADIUS.xl,
  },
  fullWidth: {
    width: '100%',
  },
  buttonText: {
    fontFamily: FONTS.orbitron.bold,
    textAlign: 'center',
    letterSpacing: 1,
  },
  buttonText_sm: { fontSize: 11 },
  buttonText_md: { fontSize: 13 },
  buttonText_lg: { fontSize: 15 },
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
  
  // Variants
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    ...SHADOWS.blue,
  },
  primaryButtonText: { color: '#ffffff' },
  
  secondaryButton: {
    backgroundColor: COLORS.surfaceLight,
    borderColor: COLORS.borderLight,
  },
  secondaryButtonText: { color: COLORS.text },
  
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: COLORS.primary,
  },
  outlineButtonText: { color: COLORS.primary },
  
  ghostButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  ghostButtonText: { color: COLORS.textMuted },
  
  dangerButton: {
    backgroundColor: COLORS.error,
    borderColor: COLORS.error,
  },
  dangerButtonText: { color: '#ffffff' },
  
  disabledButton: { opacity: 0.5 },
});

export default Button;