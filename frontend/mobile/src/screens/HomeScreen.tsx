import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ShieldCheck, 
  Files, 
  Users, 
  Fingerprint,
  ChevronRight,
  Zap,
} from 'lucide-react-native';
import Svg, { Circle, Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import DashboardHeader from '../components/DashboardHeader';
import ApiService from '../services/ApiService';
import { COLORS, FONTS, RADIUS, SHADOWS, GAPS } from '../theme';
import { useTranslation } from '../hooks/useTranslation';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    assets: 0,
    beneficiaries: 0,
    health: 98,
    wallet: '0x742d13103c8e9b36c84b3e89c...',
    countdown: '03d 12h 45m',
    totalPings: 12,
    lastActivity: null as any
  });

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      const items = await AsyncStorage.getItem('dwp_vault_items');
      const beneficiaries = await AsyncStorage.getItem('dwp_beneficiaries');
      const wallet = await AsyncStorage.getItem('dwp_wallet_address');
      const history = await AsyncStorage.getItem('dwp_heartbeat_history');
      
      const vaultItems = items ? JSON.parse(items) : [];
      const protectionNodes = beneficiaries ? JSON.parse(beneficiaries) : [];
      const heartbeatLogs = history ? JSON.parse(history) : [];

      // Calculate health based on heartbeat regularity (simplified)
      const health = heartbeatLogs.length > 0 ? 98 : 45;
      
      setStats(prev => ({
        ...prev,
        assets: vaultItems.length,
        beneficiaries: protectionNodes.length,
        health,
        wallet: wallet || prev.wallet,
        totalPings: heartbeatLogs.length,
        // Map most recent activity (demo logic)
        lastActivity: heartbeatLogs[0] || null
      }));
    } catch (e) {
      console.error(e);
    }
  };
  const signPulse = async () => {
    try {
      const api = ApiService.getInstance();
      const success = await api.recordHeartbeat('manual_dashboard_sign');
      if (success) {
        // Refresh local data to show updated ping count/stats
        loadData();
      } else {
        alert('Protocol Synchronization Failed. Check Network.');
      }
    } catch (e) {
      console.error('Pulse emission error:', e);
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <DashboardHeader walletAddress={stats.wallet} />
      
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.tabTitle}>{t('nav_dashboard').toUpperCase()}</Text>

        {/* TOP STATS ROW */}
        <View style={styles.topStatsRow}>
          {/* Vault Health */}
          <View style={styles.statCard}>
             <View style={styles.statLabelRow}>
               <Text style={styles.statLabel}>{t('vault_health')}</Text>
             </View>
             <View style={styles.healthScoreRow}>
                <View>
                  <Text style={styles.healthValue}>{stats.health}%</Text>
                  <View style={styles.statusBadge}>
                    <ShieldCheck size={10} color={COLORS.accent} />
                    <Text style={styles.statusBadgeText}>OPTIMAL</Text>
                  </View>
                </View>
                <View style={styles.radialContainer}>
                   <Svg width={40} height={40} viewBox="0 0 36 36">
                      <Circle cx="18" cy="18" r="16" fill="none" stroke={COLORS.border} strokeWidth="3" />
                      <Circle 
                        cx="18" cy="18" r="16" fill="none" 
                        stroke={COLORS.primary} strokeWidth="3" 
                        strokeDasharray="100" strokeDashoffset={100 - stats.health} 
                        strokeLinecap="round"
                        transform="rotate(-90 18 18)"
                      />
                   </Svg>
                   <View style={styles.radialIconOverlay}>
                      <ShieldCheck size={14} color={COLORS.primary} />
                   </View>
                </View>
             </View>
          </View>

          {/* Asset Stat Card */}
          <View style={styles.statCardSmall}>
             <Text style={styles.statLabel}>Encrypted Assets</Text>
             <View style={styles.statValueRow}>
               <Text style={styles.statValueLarge}>{stats.assets}</Text>
               <View style={styles.miniChart}>
                  {[8, 12, 16, 24, 20].map((h, i) => (
                    <View key={i} style={[styles.chartBar, { height: h, backgroundColor: i === 4 ? COLORS.primary : COLORS.borderLight }]} />
                  ))}
               </View>
             </View>
          </View>
        </View>

        {/* TIMELINE SECTION */}
        <View style={styles.sectionCard}>
           <View style={styles.sectionHeader}>
             <View>
               <Text style={styles.sectionTitle}>Protocol Pulse Timeline</Text>
               <Text style={styles.sectionSub}>Proof of life cryptographic verifications</Text>
             </View>
             <View style={styles.pingCountBox}>
               <Text style={styles.pingCountVal}>{stats.totalPings}</Text>
               <Text style={styles.pingCountLabel}>Total Pings</Text>
             </View>
           </View>

           <View style={styles.chartArea}>
              <Svg width={width - 48} height={150} viewBox="0 0 300 150">
                 <Defs>
                    <SvgGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                       <Stop offset="0" stopColor={COLORS.secondary} stopOpacity="0.2" />
                       <Stop offset="1" stopColor={COLORS.secondary} stopOpacity="0" />
                    </SvgGradient>
                 </Defs>
                 <Path 
                  d="M0,120 L50,110 L100,90 L150,95 L200,60 L250,50 L300,40 L300,150 L0,150 Z" 
                  fill="url(#grad)" 
                 />
                 <Path 
                  d="M0,120 L50,110 L100,90 L150,95 L200,60 L250,50 L300,40" 
                  fill="none" stroke={COLORS.primary} strokeWidth="3" strokeLinecap="round" 
                 />
                 <Circle cx={300} cy={40} r={4} fill="#fff" stroke={COLORS.secondary} strokeWidth={2} />
              </Svg>
              <View style={styles.chartLabels}>
                <Text style={styles.chartLabel}>GENESIS</Text>
                <Text style={styles.chartLabel}>EVOLUTION</Text>
                <Text style={styles.chartLabel}>ACTIVE</Text>
              </View>
           </View>
        </View>

        <View style={styles.mainGrid}>
           {/* DEAD MAN SWITCH CARD */}
           <LinearGradient 
              colors={['rgba(59, 130, 246, 0.1)', 'rgba(139, 92, 246, 0.1)']} 
              style={styles.switchGradient}
            >
              <View style={styles.switchCard}>
                 <View style={styles.switchHeader}>
                    <Text style={styles.switchTitle}>Dead Man's Switch</Text>
                    <View style={styles.activePill}>
                       <View style={styles.pulseDot} />
                       <Text style={styles.activeText}>ACTIVE</Text>
                    </View>
                 </View>

                 <View style={styles.countdownCenter}>
                    <Text style={styles.countdownValue}>03d 12h 45m</Text>
                    <Text style={styles.countdownLabel}>Until next required heartbeat</Text>
                 </View>

                 <TouchableOpacity style={styles.signButton} onPress={signPulse}>
                    <Fingerprint size={20} color="#fff" />
                    <Text style={styles.signButtonText}>{t('hero_cta')}</Text>
                 </TouchableOpacity>

                 <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit Trigger Settings</Text>
                 </TouchableOpacity>
              </View>
           </LinearGradient>

           {/* RECENT ACTIVITY */}
           <View style={styles.activityList}>
              <Text style={styles.listTitle}>Recent Activity</Text>
              
              {stats.lastActivity ? (
                <View style={styles.activityItem}>
                   <View style={[styles.activityIconBox, { backgroundColor: COLORS.accent + '15', borderColor: COLORS.accent + '30' }]}>
                      <Zap size={18} color={COLORS.accent} />
                   </View>
                   <View style={styles.activityInfo}>
                      <Text style={styles.activityMain}>Protocol Heartbeat</Text>
                      <Text style={styles.activityDate}>Status: {stats.lastActivity.status || 'VERIFIED'}</Text>
                   </View>
                   <Text style={[styles.activityStatus, { color: COLORS.accent }]}>ACTIVE</Text>
                </View>
              ) : (
                <View style={styles.activityItem}>
                   <View style={[styles.activityIconBox, { backgroundColor: COLORS.primary + '15', borderColor: COLORS.primary + '30' }]}>
                      <ShieldCheck size={18} color={COLORS.primary} />
                   </View>
                   <View style={styles.activityInfo}>
                      <Text style={styles.activityMain}>System Initialized</Text>
                      <Text style={styles.activityDate}>Protocol Genesis: Active</Text>
                   </View>
                   <ChevronRight size={14} color={COLORS.textDim} />
                </View>
              )}
           </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  scrollContent: { padding: GAPS.lg },
  tabTitle: { color: COLORS.textDim, fontFamily: FONTS.orbitron.bold, fontSize: 10, letterSpacing: 2, marginBottom: GAPS.lg },

  topStatsRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  statCard: { 
    flex: 1.2, 
    backgroundColor: COLORS.surface, 
    borderRadius: RADIUS.xl, 
    padding: 16, 
    borderWidth: 1, 
    borderColor: COLORS.border 
  },
  statLabelRow: { marginBottom: 8 },
  statCardSmall: { 
    flex: 1, 
    backgroundColor: COLORS.surface, 
    borderRadius: RADIUS.xl, 
    padding: 16, 
    borderWidth: 1, 
    borderColor: COLORS.border 
  },
  statLabel: { color: COLORS.textMuted, fontSize: 10, fontFamily: FONTS.inter.bold, marginBottom: 4 },
  healthScoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  healthValue: { color: COLORS.text, fontSize: 32, fontFamily: FONTS.orbitron.black },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  statusBadgeText: { color: COLORS.accent, fontSize: 8, fontFamily: FONTS.inter.bold },
  radialContainer: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  radialIconOverlay: { position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' },

  statValueRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12 },
  statValueLarge: { color: COLORS.text, fontSize: 24, fontFamily: FONTS.orbitron.black },
  miniChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: 24 },
  chartBar: { width: 4, borderRadius: 2 },

  sectionCard: { 
    backgroundColor: COLORS.surface, 
    borderRadius: RADIUS.xl, 
    padding: 20, 
    borderWidth: 1, 
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontFamily: FONTS.inter.bold },
  sectionSub: { color: COLORS.textDim, fontSize: 10, fontFamily: FONTS.inter.medium, marginTop: 2 },
  pingCountBox: { alignItems: 'flex-end' },
  pingCountVal: { color: COLORS.text, fontSize: 20, fontFamily: FONTS.orbitron.black },
  pingCountLabel: { color: COLORS.textDim, fontSize: 8, fontFamily: FONTS.inter.bold },

  chartArea: { height: 160, position: 'relative' },
  chartLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  chartLabel: { color: COLORS.textDim, fontSize: 7, fontFamily: FONTS.inter.bold, letterSpacing: 1 },

  mainGrid: { gap: 20 },
  switchGradient: { borderRadius: RADIUS.xl, padding: 1 },
  switchCard: { 
    backgroundColor: 'rgba(2, 6, 23, 0.9)', 
    borderRadius: RADIUS.xl, 
    padding: 24,
  },
  switchHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  switchTitle: { color: COLORS.text, fontSize: 16, fontFamily: FONTS.inter.bold },
  activePill: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.accent + '15', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.accent + '30'
  },
  pulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.accent, marginRight: 6 },
  activeText: { color: COLORS.accent, fontSize: 8, fontFamily: FONTS.inter.bold },

  countdownCenter: { alignItems: 'center', paddingVertical: 12 },
  countdownValue: { 
    fontSize: 40, 
    fontFamily: FONTS.orbitron.black, 
    color: COLORS.primary,
    letterSpacing: -1 
  },
  countdownLabel: { color: COLORS.textMuted, fontSize: 11, fontFamily: FONTS.inter.medium, marginTop: 4 },

  signButton: { 
    backgroundColor: COLORS.primary, 
    height: 56, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8, 
    marginTop: 24,
    ...SHADOWS.blue
  },
  signButtonText: { color: '#fff', fontSize: 14, fontFamily: FONTS.inter.bold },
  editButton: { height: 48, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  editButtonText: { color: COLORS.textMuted, fontSize: 12, fontFamily: FONTS.inter.bold },

  listTitle: { color: COLORS.text, fontSize: 16, fontFamily: FONTS.inter.bold, marginBottom: 12 },
  activityList: { gap: 10 },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activityIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  activityInfo: { flex: 1, marginLeft: 12 },
  activityMain: { color: COLORS.text, fontSize: 13, fontFamily: FONTS.inter.bold },
  activityDate: { color: COLORS.textDim, fontSize: 10, fontFamily: FONTS.inter.medium, marginTop: 2 },
  activityStatus: { color: COLORS.accent, fontSize: 8, fontFamily: FONTS.inter.bold },
});

export default HomeScreen;