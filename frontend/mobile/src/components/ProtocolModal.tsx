import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Modal,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { X, Shield } from 'lucide-react-native';
import { COLORS, FONTS, RADIUS, GAPS } from '../theme';

const { height } = Dimensions.get('window');

interface ProtocolModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  icon?: any;
  children: React.ReactNode;
}

const ProtocolModal = ({ visible, onClose, title, icon: IconComp = Shield, children }: ProtocolModalProps) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: height, duration: 250, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.root}>
        <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />
        </Animated.View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <Animated.View 
            style={[
              styles.container, 
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <View style={styles.card}>
              <View style={styles.header}>
                <View style={styles.headerTitleRow}>
                  <View style={styles.iconBox}>
                    <IconComp size={20} color={COLORS.primary} />
                  </View>
                  <Text style={styles.title}>{title}</Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <X size={20} color={COLORS.textDim} />
                </TouchableOpacity>
              </View>

              <View style={styles.content}>
                {children}
              </View>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(2, 6, 23, 0.92)' },
  keyboardView: { flex: 1, justifyContent: 'flex-end' },
  container: { padding: GAPS.md },
  card: { 
    backgroundColor: COLORS.surface, 
    borderRadius: RADIUS.xl, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: GAPS.lg, 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.borderLight + '30',
    backgroundColor: COLORS.surfaceLight + '50'
  },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: { width: 36, height: 36, borderRadius: RADIUS.sm, backgroundColor: COLORS.primary + '10', alignItems: 'center', justifyContent: 'center' },
  title: { color: COLORS.text, fontSize: 13, fontFamily: FONTS.orbitron.bold, letterSpacing: 1 },
  closeBtn: { padding: 4 },
  content: { padding: GAPS.lg },
});

export default ProtocolModal;
