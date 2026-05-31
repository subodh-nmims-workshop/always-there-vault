import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  Modal,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Shield, 
  Zap, 
  Lock, 
  ChevronRight, 
  CheckCircle, 
  X,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Disc,
  Fingerprint
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  withDelay,
  Easing,
  FadeInDown,
  FadeInUp
} from 'react-native-reanimated';
import { COLORS, FONTS, RADIUS, SHADOWS, GAPS, LAYOUT } from '../theme';
import { useTranslation } from '../hooks/useTranslation';

const { width, height } = Dimensions.get('window');

interface LandingScreenProps {
  onConnectWallet: () => void;
}

const SECTIONS = [
  {
    id: 'features',
    title: 'CORE PROTOCOL',
    icon: Zap,
    color: '#3b82f6',
    items: [
      { t: 'Trustless Recovery', d: 'Automated transfer logic triggered by chain-verified inactivity.' },
      { t: 'Decentralized Vault', d: 'Encrypted payloads sharded across global Storacha nodes.' },
      { t: 'Multi-Sig Proof', d: 'Inheritance release controlled by mathematical threshold signatures.' }
    ]
  },
  {
    id: 'security',
    title: 'CRYPTO SECURITY',
    icon: Lock,
    color: '#10b981',
    items: [
      { t: 'AES-256-GCM', d: 'Military-grade encryption before any byte leaves your local buffer.' },
      { t: 'Shamir Threshold', d: 'Your master keys are shattered into shards stored independently.' },
      { t: 'Zero-Knowledge', d: 'Privacy-preserving proofs ensure even nodes cant peek at contents.' }
    ]
  }
];

const GridBackground = () => {
    return (
        <View style={StyleSheet.absoluteFill}>
            <View style={styles.gridContainer}>
                {Array.from({ length: 15 }).map((_, i) => (
                    <View key={`v-${i}`} style={styles.verticalLine} />
                ))}
                {Array.from({ length: 25 }).map((_, i) => (
                    <View key={`h-${i}`} style={styles.horizontalLine} />
                ))}
            </View>
            <LinearGradient 
                colors={[COLORS.background, 'transparent', COLORS.background]} 
                style={StyleSheet.absoluteFill} 
            />
        </View>
    );
};

const PulsingShield = () => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.5);

    useEffect(() => {
        scale.value = withRepeat(withTiming(1.1, { duration: 2000, easing: Easing.inOut(Easing.ease) }), -1, true);
        opacity.value = withRepeat(withTiming(0.8, { duration: 2000, easing: Easing.inOut(Easing.ease) }), -1, true);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <View style={styles.shieldWrapper}>
            <Animated.View style={[styles.shieldOuter, animatedStyle]}>
                <View style={styles.shieldInner} />
            </Animated.View>
            <Shield size={42} color={COLORS.primary} strokeWidth={2.5} />
        </View>
    );
}

const LandingScreen = ({ onConnectWallet }: LandingScreenProps) => {
  const [activeDetail, setActiveDetail] = useState<typeof SECTIONS[0] | null>(null);
  const { t } = useTranslation();
  
  const scanPos = useSharedValue(-100);

  useEffect(() => {
    scanPos.value = withRepeat(
        withSequence(
            withTiming(height * 0.4, { duration: 3000, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
            withTiming(-100, { duration: 0 })
        ),
        -1,
        false
    );
  }, []);

  const scanStyle = useAnimatedStyle(() => ({
    top: scanPos.value,
  }));

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <GridBackground />
      
      <Animated.View style={[styles.scanningLine, scanStyle]} />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* LOGO SECTION */}
        <Animated.View entering={FadeInUp.delay(300).duration(800)} style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <Image 
                    source={require('../../assets/logo-simple.png')} 
                    style={{ width: 44, height: 44, resizeMode: 'contain' }} 
                />
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={{ color: COLORS.text, fontFamily: FONTS.orbitron.black, fontSize: 18, letterSpacing: 1.5, lineHeight: 22 }}>ALWAYS THERE</Text>
                    <Text style={{ color: COLORS.textDim, fontFamily: FONTS.orbitron.bold, fontSize: 7, letterSpacing: 2, marginTop: 4 }}>SECURE YOUR DIGITAL LEGACY</Text>
                </View>
            </View>
            <View style={styles.versionBadge}>
                <Text style={styles.versionText}>V2.4.0 ENCRYPTED</Text>
            </View>
        </Animated.View>

        {/* HERO SECTION */}
        <View style={styles.hero}>
          <Animated.View entering={FadeInDown.delay(500).duration(1000)} style={styles.badge}>
            <Disc size={12} color={COLORS.accent} style={{ marginRight: 6 }} />
            <Text style={styles.badgeText}>MAINNET NODE ACTIVE</Text>
          </Animated.View>
          
          <Animated.Text entering={FadeInDown.delay(700).duration(1000)} style={styles.heroTitle}>
            SECURE YOUR{"\n"}
            <Text style={{ color: COLORS.primary }}>DIGITAL WILL</Text>
          </Animated.Text>
          
          <Animated.Text entering={FadeInDown.delay(900).duration(1000)} style={styles.heroSubtitle}>
            The zero-trust protocol for decentralized asset inheritance. Locked by your life, triggered by your silence.
          </Animated.Text>
          
          <Animated.View entering={FadeInDown.delay(1100).duration(1000)} style={{ width: '100%' }}>
            <TouchableOpacity 
                style={styles.ctaButton} 
                onPress={onConnectWallet}
                activeOpacity={0.8}
            >
                <LinearGradient
                colors={['#1e40af', '#1d4ed8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.ctaGradient}
                >
                <Fingerprint size={22} color="#fff" />
                <Text style={styles.ctaText}>INITIALIZE KERNEL</Text>
                </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* FEATURES GRID */}
        <View style={styles.featuresRow}>
           {SECTIONS.map((section, idx) => (
             <Animated.View 
                key={section.id} 
                entering={FadeInUp.delay(1300 + (idx * 200)).duration(800)}
             >
                <TouchableOpacity 
                    style={styles.featureCard}
                    onPress={() => setActiveDetail(section)}
                    activeOpacity={0.7}
                >
                    <View style={[styles.iconContainer, { backgroundColor: section.color + '20' }]}>
                        <section.icon size={22} color={section.color} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.featureTitle}>{section.title}</Text>
                        <Text style={styles.featureSub}>{section.items[0].t}</Text>
                    </View>
                    <View style={styles.arrowBox}>
                        <ArrowRight size={14} color={COLORS.textDim} />
                    </View>
                </TouchableOpacity>
             </Animated.View>
           ))}
        </View>

        {/* TRUST INDICATORS */}
        <Animated.View entering={FadeInUp.delay(1800)} style={styles.trustBar}>
           {['AES-256', 'Web3 Storage', 'Audited'].map((label, i) => (
               <View key={i} style={styles.trustItem}>
                  <ShieldCheck size={12} color={COLORS.accent} />
                  <Text style={styles.trustText}>{label.toUpperCase()}</Text>
               </View>
           ))}
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ── DETAIL MODAL ────────────────────────────────── */}
      <Modal visible={!!activeDetail} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
           <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                 <Text style={styles.modalTitle}>{activeDetail?.title}</Text>
                 <TouchableOpacity onPress={() => setActiveDetail(null)}>
                    <X size={24} color={COLORS.text} />
                 </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.modalScroll}>
                 {activeDetail?.items.map((item, i) => (
                   <View key={i} style={styles.detailItem}>
                      <View style={[styles.detailBullet, { backgroundColor: activeDetail.color }]} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.detailTitle}>{item.t}</Text>
                        <Text style={styles.detailDesc}>{item.d}</Text>
                      </View>
                   </View>
                 ))}
                 
                 <View style={styles.techProof}>
                    <Cpu size={24} color={COLORS.primary} style={{ marginBottom: 12 }} />
                    <Text style={styles.techProofTitle}>Cryptographic Proof</Text>
                    <Text style={styles.techProofText}>
                      Every asset is sharded using Shamir's Secret Sharing Scheme. Parts are encrypted and distributed across independent IPFS nodes.
                    </Text>
                 </View>
              </ScrollView>

              <TouchableOpacity 
                style={[styles.modalCta, { backgroundColor: activeDetail?.color }]}
                onPress={() => { setActiveDetail(null); onConnectWallet(); }}
              >
                 <Text style={styles.modalCtaText}>CONTINUE TO SETUP</Text>
              </TouchableOpacity>
           </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  gridContainer: { ...StyleSheet.absoluteFillObject, opacity: 0.15 },
  verticalLine: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: COLORS.primaryGlow, left: (width / 15) * 5, marginLeft: -0.5 },
  horizontalLine: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: COLORS.primaryGlow, top: (height / 25) * 5, marginTop: -0.5 },
  scanningLine: { 
    position: 'absolute', left: 0, right: 0, height: 2, 
    backgroundColor: COLORS.primary, opacity: 0.3, zIndex: 10,
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1, shadowRadius: 10, elevation: 10
  },
  
  scrollContent: { padding: GAPS.lg },

  header: { alignItems: 'center', marginTop: 60, marginBottom: 50 },
  shieldWrapper: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  shieldOuter: { position: 'absolute', width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primaryGlow, borderWidth: 1, borderColor: COLORS.primary },
  shieldInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.primaryGlow, opacity: 0.5 },
  headerLogoText: { color: COLORS.text, fontFamily: FONTS.orbitron.black, fontSize: 16, letterSpacing: 3, textAlign: 'center' },
  versionBadge: { backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4, marginTop: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  versionText: { color: COLORS.textDim, fontSize: 8, fontFamily: FONTS.orbitron.bold, letterSpacing: 1 },

  hero: { alignItems: 'center', marginBottom: GAPS.xl, marginTop: 10 },
  badge: { 
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.accent + '15', 
    paddingHorizontal: 16, paddingVertical: 8, 
    borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.accent + '30',
    marginBottom: GAPS.xl
  },
  badgeText: { color: COLORS.accent, fontFamily: FONTS.orbitron.bold, fontSize: 10, letterSpacing: 1.5 },
  heroTitle: { color: COLORS.text, fontFamily: FONTS.orbitron.black, fontSize: 40, textAlign: 'center', lineHeight: 48, letterSpacing: -1 },
  heroSubtitle: { color: COLORS.textMuted, fontFamily: FONTS.inter.medium, fontSize: 15, textAlign: 'center', lineHeight: 24, paddingHorizontal: 10, marginBottom: 40, marginTop: 15 },

  ctaButton: { width: '100%', borderRadius: RADIUS.lg, overflow: 'hidden', ...SHADOWS.blue },
  ctaGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, gap: 12 },
  ctaText: { color: '#ffffff', fontFamily: FONTS.orbitron.bold, fontSize: 15, letterSpacing: 2 },

  featuresRow: { gap: GAPS.md, marginBottom: GAPS.xl },
  featureCard: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.03)', padding: GAPS.lg, 
    borderRadius: RADIUS.xl, borderWidth: 1, borderColor: COLORS.glassBorder 
  },
  iconContainer: { width: 48, height: 48, borderRadius: RADIUS.md, justifyContent: 'center', alignItems: 'center', marginRight: GAPS.md },
  featureTitle: { color: COLORS.text, fontFamily: FONTS.orbitron.semibold, fontSize: 13, letterSpacing: 0.5 },
  featureSub: { color: COLORS.textDim, fontSize: 10, fontFamily: FONTS.inter.bold, marginTop: 4 },
  arrowBox: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },

  trustBar: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 40, opacity: 0.6 },
  trustItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  trustText: { color: COLORS.textMuted, fontFamily: FONTS.orbitron.bold, fontSize: 9, letterSpacing: 1 },

  footer: { alignItems: 'center', opacity: 0.5, marginBottom: 20 },
  footerText: { color: COLORS.textMuted, fontFamily: FONTS.orbitron.bold, fontSize: 9, letterSpacing: 2 },
  footerSubText: { color: COLORS.textDim, fontFamily: FONTS.inter.medium, fontSize: 10, marginTop: 6 },

  // Modal Remaining...

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#111318', borderTopLeftRadius: RADIUS.xl, borderTopRightRadius: RADIUS.xl, padding: GAPS.lg, paddingBottom: 40, maxHeight: height * 0.85, borderWidth: 1, borderColor: COLORS.glassBorder, borderBottomWidth: 0 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: GAPS.xl },
  modalTitle: { color: COLORS.text, fontFamily: FONTS.orbitron.black, fontSize: 24, letterSpacing: 0.5 },
  modalScroll: { marginBottom: GAPS.xl },
  detailItem: { flexDirection: 'row', marginBottom: GAPS.xl, gap: GAPS.md },
  detailBullet: { width: 5, height: '100%', borderRadius: 3 },
  detailTitle: { color: COLORS.text, fontFamily: FONTS.inter.bold, fontSize: 18, marginBottom: 6 },
  detailDesc: { color: COLORS.textMuted, fontFamily: FONTS.inter.medium, fontSize: 14, lineHeight: 22 },
  techProof: { backgroundColor: 'rgba(255,255,255,0.03)', padding: GAPS.lg, borderRadius: RADIUS.lg, marginTop: GAPS.sm, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  techProofTitle: { color: COLORS.primary, fontFamily: FONTS.orbitron.bold, fontSize: 15, marginBottom: 8 },
  techProofText: { color: COLORS.textMuted, fontFamily: FONTS.inter.medium, fontSize: 13, lineHeight: 20 },
  modalCta: { paddingVertical: 20, borderRadius: RADIUS.xl, alignItems: 'center' },
  modalCtaText: { color: '#fff', fontFamily: FONTS.orbitron.bold, fontSize: 15, letterSpacing: 1.5 },
});

export default LandingScreen;
