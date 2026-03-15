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
  Network, 
  Lock, 
  Cloud, 
  ShieldCheck, 
  RefreshCcw,
  ArrowLeft,
  BookOpen,
  ExternalLink
} from 'lucide-react-native';
import * as Linking from 'expo-linking';
import { COLORS, FONTS, RADIUS, GAPS, SHADOWS } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

const DOCS_CONTENT = [
  {
    title: 'PROTOCOL ARCHITECTURE',
    icon: Network,
    content: 'DeadMan Protocol operates as a decentralized fail-safe. It uses Polygon-based smart contracts to monitor user heartbeats and automate asset transfer upon inactivity timeout.'
  },
  {
    title: 'ENCRYPTION STANDARDS',
    icon: Lock,
    content: 'All data is encrypted client-side using AES-256-GCM. Master keys are then fragmented using Shamir\'s Secret Sharing (SSS) and distributed across decentralized storage nodes.'
  },
  {
    title: 'DECENTRALIZED STORAGE',
    icon: Cloud,
    content: 'We utilize IPFS and Arweave for permanent, censorship-resistant storage. Your digital will survives even if our central servers or the frontend interface goes offline.'
  },
  {
    title: 'SMART CONTRACT SAFETY',
    icon: ShieldCheck,
    content: 'The core logic is immutable. No developer, including the creators of DeadMan Protocol, can access your encrypted vault or alter the beneficiary list once the timer starts.'
  },
  {
    title: 'RECOVERY MECHANISM',
    icon: RefreshCcw,
    content: 'When a heartbeat is missed and the grace period expires, the smart contract automatically reconstructs the key shards for your designated beneficiaries.'
  }
];

const DocsScreen = ({ onBack }: { onBack: () => void }) => {
  const openBrowser = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <ArrowLeft size={24} color={COLORS.textDim} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
             <BookOpen size={20} color={COLORS.primary} style={{ marginRight: 8 }} />
             <Text style={styles.title}>DOCUMENTATION</Text>
          </View>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.intro}>
            Explore the technical foundation of the world's first trustless digital inheritance protocol.
          </Text>

          {/* Web Links for expanded reading */}
          <View style={styles.linkRow}>
            <TouchableOpacity style={styles.webLinkBtn} onPress={() => openBrowser('https://deadmanprotocol.com/docs')}>
              <Text style={styles.webLinkText}>FULL DOCUMENTATION</Text>
              <ExternalLink size={14} color={COLORS.primary} style={{marginLeft: 6}} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.webLinkBtn, { borderColor: COLORS.accent + '50' }]} onPress={() => openBrowser('https://deadmanprotocol.com/support')}>
              <Text style={[styles.webLinkText, { color: COLORS.accent }]}>HELPDESK</Text>
              <ExternalLink size={14} color={COLORS.accent} style={{marginLeft: 6}} />
            </TouchableOpacity>
          </View>

          {DOCS_CONTENT.map((item, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                 <View style={styles.iconBox}>
                    <item.icon size={20} color={COLORS.primary} />
                 </View>
                 <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
              <Text style={styles.cardText}>{item.content}</Text>
            </View>
          ))}

          <View style={styles.footer}>
            <Text style={styles.footerBrand}>OPEN SOURCE PROTOCOL v2.0</Text>
            <TouchableOpacity onPress={() => openBrowser('https://github.com/deadman-protocol')}>
              <Text style={styles.footerLink}>github.com/deadman-protocol</Text>
            </TouchableOpacity>
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
  
  content: { padding: GAPS.lg },
  intro: { color: COLORS.textMuted, fontSize: 14, fontFamily: FONTS.inter.medium, lineHeight: 22, textAlign: 'center', marginBottom: GAPS.md, paddingHorizontal: GAPS.md },
  
  linkRow: { flexDirection: 'row', justifyContent: 'center', gap: GAPS.md, marginBottom: GAPS.xl },
  webLinkBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.primary + '50', backgroundColor: COLORS.surface },
  webLinkText: { color: COLORS.primary, fontFamily: FONTS.orbitron.bold, fontSize: 10, letterSpacing: 1 },

  card: { 
    backgroundColor: COLORS.surface, 
    borderRadius: RADIUS.xl, 
    padding: GAPS.lg, 
    marginBottom: GAPS.md, 
    borderWidth: 1, 
    borderColor: COLORS.border 
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: GAPS.md, gap: GAPS.md },
  iconBox: { width: 40, height: 40, borderRadius: RADIUS.sm, backgroundColor: COLORS.primary + '10', alignItems: 'center', justifyContent: 'center' },
  cardTitle: { flex: 1, color: COLORS.text, fontSize: 13, fontFamily: FONTS.orbitron.bold, letterSpacing: 1 },
  cardText: { color: COLORS.textMuted, fontSize: 13, fontFamily: FONTS.inter.medium, lineHeight: 20 },
  
  footer: { marginTop: 40, alignItems: 'center', paddingBottom: GAPS.xl },
  footerBrand: { color: COLORS.textDim, fontSize: 10, fontFamily: FONTS.orbitron.bold, letterSpacing: 1.5, opacity: 0.5 },
  footerLink: { color: COLORS.primary, fontSize: 11, fontFamily: FONTS.inter.bold, marginTop: 8 }
});

export default DocsScreen;
