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
  Map,
  CheckCircle2,
  Circle,
  Zap
} from 'lucide-react-native';
import { COLORS, FONTS, RADIUS, GAPS, SHADOWS } from '../theme';

const ROADMAP_PHASES = [
  {
    phase: 'PHASE 1',
    title: 'V1 Liveness Monitor',
    status: 'Completed',
    date: 'Q4 2025',
    color: COLORS.accent,
    desc: 'Deployment of the core AES-256-GCM encryption client and base smart contracts testing heartbeats.'
  },
  {
    phase: 'PHASE 2',
    title: 'Gasless Relayer',
    status: 'In Progress',
    date: 'Q1 2026',
    color: COLORS.primary,
    desc: 'Implementing ERC-4337 compatibility to allow users to sign heartbeats off-chain without gas fees.'
  },
  {
    phase: 'PHASE 3',
    title: 'Cross-Chain Recovery',
    status: 'Planned',
    date: 'Q3 2026',
    color: COLORS.secondary,
    desc: 'Rolling out automated disbursement layers for Solana, Arbitrum, and Bitcoin integration via DLCs.'
  },
  {
    phase: 'PHASE 4',
    title: 'ZK Beneficiary Proofs',
    status: 'Future',
    date: 'Q4 2026',
    color: COLORS.textDim,
    desc: 'Implementing zk-SNARKs so beneficiaries can prove claim rights without revealing wallet addresses.'
  },
  {
    phase: 'PHASE 5',
    title: 'Institutional Nodes',
    status: 'Future',
    date: 'Q1 2027',
    color: COLORS.textDim,
    desc: 'Law firms and banks can run dedicated relayers for hybrid execution of digital wills.'
  }
];

const RoadmapScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <ArrowLeft size={24} color={COLORS.textDim} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
             <Map size={20} color={COLORS.primary} style={{ marginRight: 8 }} />
             <Text style={styles.title}>PROTOCOL ROADMAP</Text>
          </View>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView 
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.intro}>
            Our strategic matrix towards building the definitive inheritance layer for Web3.
          </Text>

          <View style={styles.timeline}>
            <View style={styles.verticalLine} />
            
            {ROADMAP_PHASES.map((item, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={[styles.dotContainer, { backgroundColor: COLORS.background }]}>
                  {item.status === 'Completed' ? (
                    <CheckCircle2 size={24} color={item.color} style={{ backgroundColor: COLORS.background }} />
                  ) : item.status === 'In Progress' ? (
                    <Zap size={24} color={item.color} style={{ backgroundColor: COLORS.background }} />
                  ) : (
                    <Circle size={24} color={item.color} style={{ backgroundColor: COLORS.background }} />
                  )}
                </View>
                
                <View style={styles.contentCard}>
                  <View style={styles.meta}>
                    <View style={[styles.statusBadge, { backgroundColor: item.color + '15', borderColor: item.color + '40' }]}>
                      <Text style={[styles.statusText, { color: item.color }]}>
                        {item.status.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                  <Text style={[styles.phaseLabel, { color: item.color }]}>{item.phase}</Text>
                  <Text style={styles.phaseTitle}>{item.title}</Text>
                  <Text style={styles.phaseDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={{ height: 60 }} />
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
  
  scroll: { padding: GAPS.lg },
  intro: { color: COLORS.textMuted, fontSize: 13, fontFamily: FONTS.inter.medium, textAlign: 'center', marginBottom: 40, lineHeight: 20, paddingHorizontal: GAPS.md },
  
  timeline: { paddingLeft: 10, position: 'relative' },
  verticalLine: { position: 'absolute', left: 22, top: 10, bottom: 40, width: 2, backgroundColor: COLORS.border },
  
  timelineItem: { flexDirection: 'row', marginBottom: GAPS.xl, width: '100%' },
  dotContainer: { zIndex: 10, paddingVertical: 4 },
  
  contentCard: { 
    flex: 1, 
    marginLeft: GAPS.md, 
    backgroundColor: COLORS.surface, 
    padding: GAPS.lg, 
    borderRadius: RADIUS.xl, 
    borderWidth: 1, 
    borderColor: COLORS.border 
  },
  meta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS.sm, borderWidth: 1 },
  statusText: { fontSize: 9, fontFamily: FONTS.orbitron.bold, letterSpacing: 1 },
  dateText: { color: COLORS.textDim, fontSize: 12, fontFamily: FONTS.inter.bold },
  
  phaseLabel: { fontSize: 10, fontFamily: FONTS.orbitron.bold, letterSpacing: 1, marginBottom: 4 },
  phaseTitle: { color: COLORS.text, fontSize: 16, fontFamily: FONTS.inter.black, marginVertical: 4 },
  phaseDesc: { color: COLORS.textMuted, fontSize: 13, fontFamily: FONTS.inter.medium, lineHeight: 20 },
});

export default RoadmapScreen;
