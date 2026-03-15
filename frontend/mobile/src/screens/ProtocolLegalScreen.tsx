import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft,
  Scale,
  ShieldAlert,
  FileCheck,
  Shield
} from 'lucide-react-native';
import { COLORS, FONTS, RADIUS, GAPS } from '../theme';

const LEGAL_CONTENT: Record<string, { title: string, icon: any, sections: { t: string, c: string }[] }> = {
  privacy: {
    title: 'PRIVACY POLICY',
    icon: Shield,
    sections: [
      { t: 'Data Sovereignty', c: 'DeadMan Protocol does not collect personal identity data. All encryption happens locally on your device before public ledger interaction.' },
      { t: 'Decentralized Storage', c: 'Your encrypted will payloads are stored on IPFS. No centralized database holds your assets or recipient lists.' },
      { t: 'Zero Tracking', c: 'We do not use cookies or tracking pixels in the protocol layer. Your wallet address is your only identifier.' }
    ]
  },
  terms: {
    title: 'TERMS OF SERVICE',
    icon: Scale,
    sections: [
      { t: 'Smart Contract Risk', c: 'Users acknowledge that interacting with decentralized protocols involves smart contract risk. We verify code but do not provide financial insurance.' },
      { t: 'Key Responsibility', c: 'Loss of your 12-word seed phrase or local device PIN results in permanent loss of access to your vault. There is no password reset.' },
      { t: 'Protocol Decay', c: 'The protocol is automated. Failure to perform a heartbeat check-in within the configured window will trigger asset release according to the code.' }
    ]
  },
  security: {
    title: 'SECURITY POLICY',
    icon: ShieldAlert,
    sections: [
      { t: 'Encryption Layer', c: 'We utilize industry-standard AES-256-GCM authenticated encryption for all vault payloads.' },
      { t: 'Shamir Sharding', c: 'Master keys are shattered into 5 fragments using SSS. A quorum of 3 shards is required for automated reconstruction.' },
      { t: 'Audit Trail', c: 'The Polygon smart contracts governing the heartbeat monitor are open-source and undergo periodic mathematical verification.' }
    ]
  }
};

const ProtocolLegalScreen = ({ type, onBack }: { type: 'privacy' | 'terms' | 'security', onBack: () => void }) => {
  const content = LEGAL_CONTENT[type];
  const IconComp = content.icon;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <ArrowLeft size={24} color={COLORS.textDim} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
             <IconComp size={20} color={COLORS.primary} style={{ marginRight: 8 }} />
             <Text style={styles.title}>{content.title}</Text>
          </View>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView 
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.badge}>
            <Text style={styles.badgeText}>LAST COMPILED: MARCH 2026</Text>
          </View>

          {content.sections.map((item, i) => (
            <View key={i} style={styles.section}>
              <View style={styles.sectionHeader}>
                 <View style={styles.bulletBox}>
                    <View style={styles.bulletPoint} />
                 </View>
                 <Text style={styles.sectionTitle}>{item.t}</Text>
              </View>
              <Text style={styles.sectionText}>{item.c}</Text>
            </View>
          ))}

          <View style={styles.footer}>
            <FileCheck size={48} color={COLORS.accent + '20'} />
            <Text style={styles.footerText}>SECURE DECENTRALIZED PROTOCOL</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: GAPS.lg, 
    paddingVertical: GAPS.md,
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.borderLight + '50' 
  },
  backBtn: { width: 44, height: 44, justifyContent: 'center' },
  titleContainer: { flexDirection: 'row', alignItems: 'center' },
  title: { color: COLORS.text, fontSize: 13, fontFamily: FONTS.orbitron.black, letterSpacing: 2 },
  
  scroll: { padding: GAPS.xl },
  badge: { backgroundColor: COLORS.surface, alignSelf: 'center', paddingHorizontal: 16, paddingVertical: 8, borderRadius: RADIUS.md, marginBottom: GAPS.xl, borderWidth: 1, borderColor: COLORS.borderLight },
  badgeText: { color: COLORS.textMuted, fontSize: 10, fontFamily: FONTS.orbitron.bold, letterSpacing: 1.5 },
  
  section: { marginBottom: GAPS.xl, backgroundColor: COLORS.surface, padding: GAPS.lg, borderRadius: RADIUS.xl, borderWidth: 1, borderColor: COLORS.border },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: GAPS.sm },
  bulletBox: { width: 16, height: 16, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  bulletPoint: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.primary },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontFamily: FONTS.inter.black },
  sectionText: { color: COLORS.textMuted, fontSize: 13, lineHeight: 22, fontFamily: FONTS.inter.medium, paddingLeft: 24 },
  
  footer: { alignItems: 'center', marginTop: 40, paddingBottom: 60, opacity: 0.8 },
  footerText: { color: COLORS.textDim, fontSize: 10, fontFamily: FONTS.orbitron.bold, letterSpacing: 2, marginTop: 12 }
});

export default ProtocolLegalScreen;
