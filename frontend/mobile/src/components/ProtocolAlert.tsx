import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { ShieldCheck, ShieldAlert, Info, ShieldQuestion } from 'lucide-react-native';
import { COLORS, FONTS, RADIUS, GAPS, SHADOWS } from '../theme';

const { height } = Dimensions.get('window');

interface ProtocolAlertProps {
  visible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'confirm';
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ProtocolAlert = ({ 
  visible, 
  title, 
  message, 
  type = 'info', 
  onClose, 
  onConfirm,
  confirmText = 'ACKNOWLEDGE',
  cancelText = 'BACK'
}: ProtocolAlertProps) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: height, duration: 200, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 0.95, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  const getTheme = () => {
    switch (type) {
      case 'success': return { icon: ShieldCheck, color: COLORS.accent };
      case 'error': return { icon: ShieldAlert, color: COLORS.error };
      case 'confirm': return { icon: ShieldQuestion, color: COLORS.secondary };
      default: return { icon: Info, color: COLORS.primary };
    }
  };

  const theme = getTheme();
  const IconComp = theme.icon;

  return (
    <View style={[StyleSheet.absoluteFill, { zIndex: 99999 }]} pointerEvents={visible ? 'auto' : 'none'}>
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />
      </Animated.View>
      
      <Animated.View 
        style={[
          styles.container, 
          { 
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ] 
          }
        ]}
      >
        <View style={styles.card}>
          <View style={styles.content}>
            <View style={[styles.iconContainer, { backgroundColor: theme.color + '15', borderColor: theme.color + '30' }]}>
               <IconComp size={32} color={theme.color} />
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            
            <View style={styles.actionRow}>
              {type === 'confirm' ? (
                <>
                  <TouchableOpacity style={styles.secondaryBtn} onPress={onClose}>
                    <Text style={styles.secondaryBtnText}>{cancelText}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.primaryBtn, { backgroundColor: theme.color }]} 
                    onPress={() => { onConfirm?.(); onClose(); }}
                  >
                    <Text style={styles.primaryBtnText}>{confirmText}</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity 
                  style={[styles.primaryBtn, { backgroundColor: theme.color, width: '100%' }]} 
                  onPress={onClose}
                >
                  <Text style={styles.primaryBtnText}>{confirmText}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 6, 23, 0.9)',
  },
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 20,
    left: GAPS.md,
    right: GAPS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOWS.blue,
  },
  content: {
    padding: GAPS.xl,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: GAPS.lg,
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: FONTS.orbitron.black,
    textAlign: 'center',
    marginBottom: GAPS.sm,
    letterSpacing: 1,
  },
  message: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontFamily: FONTS.inter.medium,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: GAPS.xl,
  },
  actionRow: {
    flexDirection: 'row',
    width: '100%',
    gap: GAPS.md,
  },
  primaryBtn: {
    flex: 2,
    height: 56,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: FONTS.orbitron.bold,
    letterSpacing: 2,
  },
  secondaryBtn: {
    flex: 1,
    height: 56,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  secondaryBtnText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontFamily: FONTS.inter.bold,
  },
});

export default ProtocolAlert;
