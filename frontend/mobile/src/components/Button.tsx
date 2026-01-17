/**
 * Professional Button Component
 * Customizable button with multiple variants and states
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
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
  icon,
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
      case 'primary':
        return { ...baseStyle, ...styles.primaryButton };
      case 'secondary':
        return { ...baseStyle, ...styles.secondaryButton };
      case 'outline':
        return { ...baseStyle, ...styles.outlineButton };
      case 'ghost':
        return { ...baseStyle, ...styles.ghostButton };
      case 'danger':
        return { ...baseStyle, ...styles.dangerButton };
      default:
        return { ...baseStyle, ...styles.primaryButton };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...styles.buttonText,
      ...styles[`buttonText_${size}`],
    };

    switch (variant) {
      case 'primary':
        return { ...baseStyle, ...styles.primaryButtonText };
      case 'secondary':
        return { ...baseStyle, ...styles.secondaryButtonText };
      case 'outline':
        return { ...baseStyle, ...styles.outlineButtonText };
      case 'ghost':
        return { ...baseStyle, ...styles.ghostButtonText };
      case 'danger':
        return { ...baseStyle, ...styles.dangerButtonText };
      default:
        return { ...baseStyle, ...styles.primaryButtonText };
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
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'danger' ? '#ffffff' : '#3b82f6'}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Icon
              name={icon}
              size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
              color={getTextStyle().color}
              style={styles.iconLeft}
            />
          )}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Icon
              name={icon}
              size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
              color={getTextStyle().color}
              style={styles.iconRight}
            />
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  button_sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  button_md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  button_lg: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 52,
  },
  fullWidth: {
    width: '100%',
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonText_sm: {
    fontSize: 14,
  },
  buttonText_md: {
    fontSize: 16,
  },
  buttonText_lg: {
    fontSize: 18,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  // Primary Button
  primaryButton: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  primaryButtonText: {
    color: '#ffffff',
  },
  // Secondary Button
  secondaryButton: {
    backgroundColor: '#f3f4f6',
    borderColor: '#f3f4f6',
  },
  secondaryButtonText: {
    color: '#374151',
  },
  // Outline Button
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: '#3b82f6',
  },
  outlineButtonText: {
    color: '#3b82f6',
  },
  // Ghost Button
  ghostButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  ghostButtonText: {
    color: '#3b82f6',
  },
  // Danger Button
  dangerButton: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  dangerButtonText: {
    color: '#ffffff',
  },
  // Disabled Button
  disabledButton: {
    opacity: 0.5,
  },
});

export default Button;