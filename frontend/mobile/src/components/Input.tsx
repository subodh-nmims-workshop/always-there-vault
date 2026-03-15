import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Eye, EyeOff, AlertCircle } from 'lucide-react-native';
import { COLORS, FONTS, RADIUS, GAPS } from '../theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url';
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  disabled?: boolean;
  icon?: any;
  rightIcon?: any;
  onRightIconPress?: () => void;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  error,
  disabled = false,
  icon: IconComp,
  rightIcon: RightIconComp,
  onRightIconPress,
  maxLength,
  autoCapitalize = 'sentences',
  autoCorrect = true,
  style,
  inputStyle,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const getContainerStyle = () => {
    return [
      styles.container,
      isFocused && styles.focusedContainer,
      error ? styles.errorContainer : null,
      disabled && styles.disabledContainer,
      style,
    ];
  };

  const getInputStyle = () => {
    return [
      styles.input,
      multiline && styles.multilineInput,
      IconComp ? styles.inputWithLeftIcon : null,
      (RightIconComp || secureTextEntry) ? styles.inputWithRightIcon : null,
      disabled && styles.disabledInput,
      inputStyle,
    ];
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}
      
      <View style={getContainerStyle()}>
        {IconComp && (
          <View style={styles.leftIcon}>
            <IconComp
              size={20}
              color={error ? COLORS.error : isFocused ? COLORS.primary : COLORS.textDim}
            />
          </View>
        )}
        
        <TextInput
          style={getInputStyle()}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textDim}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.rightIcon}
          >
            {showPassword ? (
              <EyeOff size={20} color={isFocused ? COLORS.primary : COLORS.textDim} />
            ) : (
              <Eye size={20} color={isFocused ? COLORS.primary : COLORS.textDim} />
            )}
          </TouchableOpacity>
        )}
        
        {RightIconComp && !secureTextEntry && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
          >
            <RightIconComp
              size={20}
              color={error ? COLORS.error : isFocused ? COLORS.primary : COLORS.textDim}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <View style={styles.errorTextContainer}>
          <AlertCircle size={14} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {maxLength && (
        <Text style={styles.characterCount}>
          {value.length}/{maxLength}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: GAPS.md,
  },
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    fontFamily: FONTS.orbitron.bold,
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
  required: {
    color: COLORS.error,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    minHeight: 52,
  },
  focusedContainer: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surfaceLight,
  },
  errorContainer: {
    borderColor: COLORS.error,
  },
  disabledContainer: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.borderLight,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.inter.medium,
    color: COLORS.text,
    paddingHorizontal: GAPS.md,
    paddingVertical: 12,
  },
  multilineInput: {
    textAlignVertical: 'top',
    minHeight: 100,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  disabledInput: {
    color: COLORS.textDim,
  },
  leftIcon: {
    marginLeft: GAPS.md,
  },
  rightIcon: {
    marginRight: GAPS.md,
    padding: 4,
  },
  errorTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  errorText: {
    fontSize: 12,
    fontFamily: FONTS.inter.medium,
    color: COLORS.error,
    marginLeft: 6,
  },
  characterCount: {
    fontSize: 10,
    fontFamily: FONTS.inter.bold,
    color: COLORS.textDim,
    textAlign: 'right',
    marginTop: 6,
  },
});

export default Input;