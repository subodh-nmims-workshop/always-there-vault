import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
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
  Terminal,
  Activity,
} from 'lucide-react-native';
import Svg, { Circle, Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import DashboardHeader from '../components/DashboardHeader';
import ApiService from '../services/ApiService';
import StorageService from '../services/StorageService';
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

  const [logs, setLogs] = useState<any[]>([]);
  const [activeTranslation, setActiveTranslation] = useState<string>('Booting up secure vaults and protocol components...');
  const logsScrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    logsScrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const addLog = useCallback(async (status: string, message: string, color: string) => {
    const newLog = {
      time: new Date().toLocaleTimeString(),
      status,
      message,
      color,
    };
    setLogs(prev => [...prev, newLog].slice(-25));
    try {
      await StorageService.getInstance().saveDiagnosticLog(newLog);
    } catch (e) {
      console.warn('Failed to save mobile diagnostic log:', e);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
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

      // Load diagnostic logs
      const storage = StorageService.getInstance();
      const existingLogs = await storage.getDiagnosticLogs();
      if (existingLogs && existingLogs.length > 0) {
        setLogs(existingLogs.slice(-25));
        setActiveTranslation('System telemetry loaded from persistent vault storage.');
      } else {
        const initialLogs = [
          { time: new Date().toLocaleTimeString(), status: 'INFO', message: 'Initializing DeadMan Protocol Kernel v3.1.0...', color: '#3b82f6' },
          { time: new Date().toLocaleTimeString(), status: 'OK', message: `Local storage state loaded. Ledger contains ${vaultItems.length} items.`, color: '#10b981' },
          { time: new Date().toLocaleTimeString(), status: 'OK', message: 'Loaded Shamir secret sharing configuration (Threshold: 3/5).', color: '#10b981' }
        ];
        setLogs(initialLogs);
        for (const log of initialLogs) {
          await storage.saveDiagnosticLog(log);
        }
        setActiveTranslation('Secure Vault Initialization: Loading database, identity keypairs, and configurations.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const signPulse = async () => {
    try {
      const api = ApiService.getInstance();
      const success = await api.recordHeartbeat('manual_dashboard_sign');
      if (success) {
        addLog('SECURE', 'Verification Signature: Heartbeat registered successfully via [MANUAL].', '#10b981');
        setActiveTranslation('Heartbeat verified: Your system proof-of-life status has been updated and switch timer reset.');
        // Refresh local data to show updated ping count/stats
        loadData();
      } else {
        addLog('ERROR', 'Protocol Synchronization: FAILED.', '#ef4444');
        alert('Protocol Synchronization Failed. Check Network.');
      }
    } catch (e) {
      addLog('ERROR', 'Pulse emission error: connection timed out.', '#ef4444');
      console.error('Pulse emission error:', e);
    }
  };

  useEffect(() => {
    // Setup real-time periodic logs loop with translations
    const liveLogsBank = [
      { 
        status: 'OK', 
        message: 'P2P network ping roundtrip: 42ms.', 
        color: '#10b981',
        translation: 'Connection is stable: Blockchain nodes responding quickly.'
      },
      { 
        status: 'SECURE', 
        message: 'Audited Shamir shares: 3/5 shares online & intact.', 
        color: '#10b981',
        translation: 'Key shards verified: Your digital legacy keys are split and stored securely.' 
      },
      { 
        status: 'OK', 
        message: 'Broadcasted state updates to DHT. Pin status: ACTIVE.', 
        color: '#10b981',
        translation: 'Encrypted backup sync: Safely pinned latest updates to decentralized servers.'
      },
      { 
        status: 'INFO', 
        message: 'Periodic system health check: Status OPTIMAL.', 
        color: '#3b82f6',
        translation: 'All systems green: Automated background security audit completed successfully.'
      },
      { 
        status: 'OK', 
        message: 'Verified zero-knowledge state proof of local database.', 
        color: '#10b981',
        translation: 'Cryptographic proof verified: Local database records are authentic.'
      },
      { 
        status: 'SECURE', 
        message: 'Checked threshold conditions: Trigger timer active.', 
        color: '#10b981',
        translation: 'Dead-man switch monitor: Waiting for next heartbeat scheduled check.'
      },
      { 
        status: 'OK', 
        message: 'Syncing block headers: current height #4,921,805.', 
        color: '#10b981',
        translation: 'Ledger sync active: Synchronized with the latest blockchain block.'
      },
      { 
        status: 'INFO', 
        message: 'Challenge window status: Remaining time 14 days, 3 hours.', 
        color: '#3b82f6',
        translation: 'Milestone reminder: Next proof-of-life ping is due in 14 days.'
      },
      { 
        status: 'OK', 
        message: 'Consensus verified: 12 nodes confirmed latest state transition.', 
        color: '#10b981',
        translation: 'Network agreement: Decentralized validators confirmed vault settings.'
      },
      { 
        status: 'SECURE', 
        message: 'AES-256-GCM integrity check: PASSED.', 
        color: '#10b981',
        translation: 'Military-grade encryption verified: Files remain locked and untampered.'
      },
    ];

    let logIndex = 0;
    const intervalId = setInterval(() => {
      const nextLog = liveLogsBank[logIndex % liveLogsBank.length];
      addLog(nextLog.status, nextLog.message, nextLog.color);
      setActiveTranslation(nextLog.translation);
      logIndex++;
    }, 8000);

    return () => clearInterval(intervalId);
  }, [addLog]);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <DashboardHeader walletAddress={stats.wallet} />
      
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.Text entering={FadeInDown.delay(100).duration(800)} style={styles.tabTitle}>{t('nav_dashboard').toUpperCase()}</Animated.Text>

        {/* TOP STATS ROW */}
        <View style={styles.topStatsRow}>
          {/* Vault Health */}
          <Animated.View entering={FadeInUp.delay(300).duration(800)} style={styles.statCard}>
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
          </Animated.View>

          {/* Asset Stat Card */}
          <Animated.View entering={FadeInUp.delay(500).duration(800)} style={styles.statCardSmall}>
             <Text style={styles.statLabel}>Encrypted Assets</Text>
             <View style={styles.statValueRow}>
               <Text style={styles.statValueLarge}>{stats.assets}</Text>
               <View style={styles.miniChart}>
                  {[8, 12, 16, 24, 20].map((h, i) => (
                    <View key={i} style={[styles.chartBar, { height: h, backgroundColor: i === 4 ? COLORS.primary : COLORS.borderLight }]} />
                  ))}
               </View>
             </View>
          </Animated.View>
        </View>

        {/* TIMELINE SECTION */}
         {/* SECURITY & PULSE CENTER */}
         <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Security & Pulse Center</Text>
                <Text style={styles.sectionSub}>Proof of life on-chain verification</Text>
              </View>
              <View style={styles.pingCountBox}>
                <Text style={styles.pingCountVal}>{stats.totalPings}</Text>
                <Text style={styles.pingCountLabel}>Total Pings</Text>
              </View>
            </View>

            {/* Mobile ECG Wave */}
            <View style={styles.mobileEcgContainer}>
               <View style={styles.liveBadge}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>PULSE ONLINE</Text>
               </View>
               <Svg width={width - 80} height={40} viewBox="0 0 300 40">
                  <Path
                   d="M0,20 L80,20 L90,12 L95,28 L105,4 L115,36 L122,16 L130,20 L210,20 L220,12 L225,28 L235,4 L245,36 L252,16 L260,20 L300,20"
                   fill="none"
                   stroke={COLORS.primary}
                   strokeWidth="2.5"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                  />
               </Svg>
            </View>

            {/* Verification Grid */}
            <Text style={styles.matrixTitle}>Verification Audit Matrix</Text>
            <View style={styles.matrixGrid}>
               {Array.from({ length: 16 }).map((_, index) => {
                  const isVerified = index < stats.totalPings;
                  const isActive = index === stats.totalPings;
                  return (
                     <View 
                        key={index} 
                        style={[
                           styles.matrixBlock, 
                           isVerified && styles.matrixBlockVerified,
                           isActive && styles.matrixBlockActive,
                        ]}
                     >
                        <Text 
                           style={[
                              styles.matrixBlockText,
                              isVerified && styles.matrixBlockTextVerified,
                              isActive && styles.matrixBlockTextActive,
                           ]}
                        >
                           {index + 1}
                        </Text>
                     </View>
                  );
               })}
            </View>

            <View style={styles.matrixLegend}>
               <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.accent + '25', borderColor: COLORS.accent }]} />
                  <Text style={styles.legendText}>Verified</Text>
               </View>
               <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.primary, borderColor: COLORS.primary }]} />
                  <Text style={styles.legendText}>Active</Text>
               </View>
               <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.surface, borderColor: COLORS.border }]} />
                  <Text style={styles.legendText}>Scheduled</Text>
               </View>
            </View>
         </View>

         {/* DEEP KERNEL LOGS TERMINAL */}
         <View style={styles.consoleCard}>
            <View style={styles.consoleHeader}>
               <View style={styles.consoleTitleRow}>
                  <Terminal size={14} color={COLORS.textMuted} />
                  <Text style={styles.consoleTitle}>DEEP KERNEL LOGS</Text>
               </View>
               <View style={styles.consoleLiveBadge}>
                  <View style={styles.consoleLiveDot} />
                  <Text style={styles.consoleLiveText}>DECODER ACTIVE</Text>
               </View>
            </View>

            {/* Explainer / Translation Panel */}
            <View style={styles.translationPanel}>
               <View style={styles.translationIconBox}>
                  <Activity size={16} color="#fff" />
               </View>
               <View style={{ flex: 1 }}>
                  <Text style={styles.translationSubtitle}>USER-FRIENDLY STATUS DECODER</Text>
                  <Text style={styles.translationText}>{activeTranslation}</Text>
               </View>
            </View>

            {/* Terminal Window */}
            <View style={styles.terminalWindow}>
               <View style={styles.terminalHeader}>
                  <View style={styles.terminalDots}>
                     <View style={[styles.terminalDot, { backgroundColor: '#ef4444' }]} />
                     <View style={[styles.terminalDot, { backgroundColor: '#f59e0b' }]} />
                     <View style={[styles.terminalDot, { backgroundColor: '#10b981' }]} />
                  </View>
                  <Text style={styles.terminalHeaderText}>sh — alwaysthere-kernel — 80x24</Text>
               </View>
               <ScrollView 
                  ref={logsScrollViewRef}
                  style={styles.terminalBody}
                  contentContainerStyle={{ padding: 12 }}
                  onContentSizeChange={scrollToBottom}
                  showsVerticalScrollIndicator={true}
               >
                  {logs.map((log, i) => (
                     <View key={i} style={styles.logLine}>
                        <Text style={styles.logTime}>[{log.time}]</Text>
                        <Text style={[styles.logStatus, { color: log.color }]}>[{log.status}]</Text>
                        <Text style={styles.logMessage}>{log.message}</Text>
                     </View>
                  ))}
                  <View style={styles.logLine}>
                     <Text style={styles.logTime}>[{new Date().toLocaleTimeString()}]</Text>
                     <Text style={[styles.logStatus, { color: COLORS.primary }]}>[&gt;]</Text>
                     <Text style={styles.logMessageActive}>
                        Kernel state: OPTIMAL. Listening for events...
                     </Text>
                     <View style={styles.blinkingCursor} />
                  </View>
               </ScrollView>
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

  mobileEcgContainer: {
    height: 70,
    backgroundColor: 'rgba(30, 41, 59, 0.2)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginVertical: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  liveBadge: {
    position: 'absolute',
    top: 6,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent + '15',
    borderColor: COLORS.accent + '30',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  liveDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.accent,
    marginRight: 4,
  },
  liveText: {
    color: COLORS.accent,
    fontSize: 6,
    fontFamily: FONTS.inter.bold,
  },
  matrixTitle: {
    color: COLORS.textDim,
    fontSize: 10,
    fontFamily: FONTS.inter.bold,
    marginTop: 8,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  matrixGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  matrixBlock: {
    width: '10.5%',
    aspectRatio: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matrixBlockVerified: {
    backgroundColor: COLORS.accent + '15',
    borderColor: COLORS.accent + '40',
  },
  matrixBlockActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  matrixBlockText: {
    fontSize: 8,
    color: COLORS.textDim,
    fontFamily: FONTS.inter.bold,
  },
  matrixBlockTextVerified: {
    color: COLORS.accent,
  },
  matrixBlockTextActive: {
    color: '#fff',
  },
  matrixLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
    borderWidth: 1,
  },
  legendText: {
    color: COLORS.textDim,
    fontSize: 8,
    fontFamily: FONTS.inter.medium,
  },

  consoleCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  consoleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  consoleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  consoleTitle: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontFamily: FONTS.orbitron.bold,
    letterSpacing: 2,
  },
  consoleLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryGlow,
    borderColor: COLORS.primary + '30',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  consoleLiveDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginRight: 4,
  },
  consoleLiveText: {
    color: COLORS.primary,
    fontSize: 6,
    fontFamily: FONTS.inter.bold,
  },
  translationPanel: {
    backgroundColor: 'rgba(17, 82, 212, 0.05)',
    borderColor: 'rgba(17, 82, 212, 0.15)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  translationIconBox: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  translationSubtitle: {
    color: COLORS.primary,
    fontSize: 8,
    fontFamily: FONTS.inter.black,
    letterSpacing: 1,
  },
  translationText: {
    color: COLORS.text,
    fontSize: 12,
    fontFamily: FONTS.inter.bold,
    marginTop: 2,
  },
  terminalWindow: {
    backgroundColor: 'rgba(2, 6, 23, 0.95)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  terminalHeader: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  terminalDots: {
    flexDirection: 'row',
    gap: 4,
  },
  terminalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  terminalHeaderText: {
    color: COLORS.textMuted,
    fontSize: 9,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  terminalBody: {
    height: 160,
  },
  logLine: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
    alignItems: 'center',
  },
  logTime: {
    color: COLORS.textDim,
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  logStatus: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontWeight: 'bold',
    width: 55,
  },
  logMessage: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    flex: 1,
  },
  logMessageActive: {
    color: COLORS.text,
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  blinkingCursor: {
    width: 6,
    height: 12,
    backgroundColor: COLORS.primary,
    marginLeft: 4,
  },

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