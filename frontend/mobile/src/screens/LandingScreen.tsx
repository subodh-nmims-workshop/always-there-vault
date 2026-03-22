import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Shield, 
  Zap, 
  Lock, 
  Globe, 
  ChevronRight, 
  CheckCircle, 
  X,
  Cpu,
  Fingerprint,
  ArrowRight
} from 'lucide-react-native';
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
    color: COLORS.primary,
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
    color: COLORS.accent,
    items: [
      { t: 'AES-256-GCM', d: 'Military-grade encryption before any byte leaves your local buffer.' },
      { t: 'Shamir Threshold', d: 'Your master keys are shattered into shards stored independently.' },
      { t: 'Zero-Knowledge', d: 'Privacy-preserving proofs ensure even nodes cant peek at contents.' }
    ]
  }
];

const LandingScreen = ({ onConnectWallet }: LandingScreenProps) => {
  const [activeDetail, setActiveDetail] = useState<typeof SECTIONS[0] | null>(null);
  const { t } = useTranslation();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 1200, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      
      {/* ── BACKGROUND ACCENT ────────────────────────────── */}
      <View style={styles.bgGlow} />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── TOP LOGO ────────────────────────────────────── */}
        <View style={styles.header}>
           <Shield size={32} color={COLORS.primary} />
           <Text style={styles.headerLogoText}>DEADMAN PROTOCOL</Text>
        </View>

        {/* ── HERO ────────────────────────────────────────── */}
        <Animated.View style={[styles.hero, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{t('landing_badge')}</Text>
          </View>
          
          <Text style={styles.heroTitle}>{t('landing_title1')}</Text>
          <Text style={styles.heroTitleAccent}>{t('landing_title2')}</Text>
          
          <Text style={styles.heroSubtitle}>
            {t('landing_subtitle')}
          </Text>
          
          <TouchableOpacity 
            style={styles.ctaButton} 
            onPress={onConnectWallet}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[COLORS.primary, '#2563eb']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaText}>{t('landing_cta')}</Text>
              <ArrowRight size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* ── FEATURES GRID ─────────────────────────────── */}
        <View style={styles.featuresRow}>
           {SECTIONS.map(section => (
             <TouchableOpacity 
               key={section.id} 
               style={styles.featureCard}
               onPress={() => setActiveDetail(section)}
             >
                <View style={[styles.iconContainer, { backgroundColor: section.color + '15' }]}>
                   <section.icon size={24} color={section.color} />
                </View>
                <Text style={styles.featureTitle}>{section.title}</Text>
                <ChevronRight size={16} color={COLORS.textDim} />
             </TouchableOpacity>
           ))}
        </View>

        {/* ── TRUST BAR ─────────────────────────────────── */}
        <View style={styles.trustBar}>
           <View style={styles.trustItem}>
              <CheckCircle size={14} color={COLORS.accent} />
              <Text style={styles.trustText}>IPFS ENCRYPTED</Text>
           </View>
           <View style={styles.trustItem}>
              <CheckCircle size={14} color={COLORS.accent} />
              <Text style={styles.trustText}>AUDITED LOGIC</Text>
           </View>
           <View style={styles.trustItem}>
              <CheckCircle size={14} color={COLORS.accent} />
              <Text style={styles.trustText}>ZERO-KNOWLEDGE</Text>
           </View>
        </View>

        {/* ── FOOTER ────────────────────────────────────── */}
        <View style={styles.footer}>
           <Text style={styles.footerText}>PROTOCOL NODE CONNECTED</Text>
           <Text style={styles.footerSubText}>© 2026 DECENTRALIZED DIGITAL WILL PROTOCOL</Text>
        </View>

        <View style={{ height: 60 }} />
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
  bgGlow: { 
    position: 'absolute', top: -150, right: -50, 
    width: 400, height: 400, borderRadius: 200, 
    backgroundColor: COLORS.primary + '10', // Changed to blur on web, just a soft color on mobile
  },
  scrollContent: { padding: GAPS.lg },

  header: { alignItems: 'center', marginTop: 60, marginBottom: 50 },
  headerLogoText: { color: COLORS.text, fontFamily: FONTS.orbitron.black, fontSize: 14, letterSpacing: 4, marginTop: 14 },

  hero: { alignItems: 'center', marginBottom: GAPS.xl },
  badge: { 
    backgroundColor: COLORS.primary + '15', 
    paddingHorizontal: 16, paddingVertical: 8, 
    borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.primary + '30',
    marginBottom: GAPS.xl
  },
  badgeText: { color: COLORS.primary, fontFamily: FONTS.orbitron.bold, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase' },
  heroTitle: { color: COLORS.text, fontFamily: FONTS.orbitron.black, fontSize: 40, textAlign: 'center', lineHeight: 48 },
  heroTitleAccent: { color: COLORS.primary, fontFamily: FONTS.orbitron.black, fontSize: 40, textAlign: 'center', lineHeight: 48, marginBottom: 10 },
  heroSubtitle: { color: COLORS.textMuted, fontFamily: FONTS.inter.medium, fontSize: 16, textAlign: 'center', lineHeight: 24, paddingHorizontal: GAPS.sm, marginBottom: 40 },

  ctaButton: { width: '100%', borderRadius: RADIUS.xl, overflow: 'hidden', ...SHADOWS.blue },
  ctaGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 22, gap: 12 },
  ctaText: { color: '#ffffff', fontFamily: FONTS.orbitron.bold, fontSize: 16, letterSpacing: 1.5 },

  featuresRow: { gap: GAPS.md, marginBottom: GAPS.xl },
  featureCard: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: COLORS.surface, padding: GAPS.lg, 
    borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.glassBorder 
  },
  iconContainer: { width: 52, height: 52, borderRadius: RADIUS.md, justifyContent: 'center', alignItems: 'center', marginRight: GAPS.md },
  featureTitle: { flex: 1, color: COLORS.text, fontFamily: FONTS.orbitron.semibold, fontSize: 14, letterSpacing: 1 },

  trustBar: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 70, flexWrap: 'wrap' },
  trustItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  trustText: { color: COLORS.textMuted, fontFamily: FONTS.inter.bold, fontSize: 10, letterSpacing: 1.2 },

  footer: { alignItems: 'center', opacity: 0.6 },
  footerText: { color: COLORS.textMuted, fontFamily: FONTS.orbitron.bold, fontSize: 10, letterSpacing: 2 },
  footerSubText: { color: COLORS.textDim, fontFamily: FONTS.inter.medium, fontSize: 10, marginTop: 8 },

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
