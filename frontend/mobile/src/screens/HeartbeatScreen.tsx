import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  Zap, 
  Clock, 
  History, 
  CheckCircle2, 
  AlertCircle,
  Fingerprint,
  Calendar,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DashboardHeader from '../components/DashboardHeader';
import { COLORS, FONTS, RADIUS, SHADOWS, GAPS } from '../theme';

import ApiService from '../services/ApiService';

const HeartbeatScreen = () => {
  const [lastHeartbeat, setLastHeartbeat] = useState<string>('Never');
  const [pulseCount, setPulseCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [wallet, setWallet] = useState('0x742d...84b3');

  const [history, setHistory] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const api = ApiService.getInstance();
    const w = await AsyncStorage.getItem('dwp_wallet_address');
    if (w) setWallet(w);

    const res = await api.getHeartbeatStatus();
    if (res.success && res.data) {
      const { lastHeartbeat } = res.data;
      if (lastHeartbeat) {
        setLastHeartbeat(new Date(lastHeartbeat).toLocaleString());
      }
    }

    const saved = await AsyncStorage.getItem('dwp_heartbeat_history');
    if (saved) {
      const parsed = JSON.parse(saved);
      setHistory(parsed);
      setPulseCount(parsed.length);
    }
  };

  const handlePulse = async () => {
    setIsLoading(true);
    try {
      const api = ApiService.getInstance();
      const success = await api.recordHeartbeat('manual_pulse_screen');
      if (success) {
        const now = new Date();
        const newPulse = { id: now.getTime(), timestamp: now.toISOString(), status: 'SUCCESS' };
        const saved = await AsyncStorage.getItem('dwp_heartbeat_history');
        const history = saved ? JSON.parse(saved) : [];
        const updated = [newPulse, ...history];
        await AsyncStorage.setItem('dwp_heartbeat_history', JSON.stringify(updated));
        setHistory(updated);
        setPulseCount(updated.length);
        setLastHeartbeat(now.toLocaleString());
      } else {
        alert('Pulse emission failed. Check connection.');
      }
    } catch (e) {
      alert('Network or session error during pulse.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <DashboardHeader walletAddress={wallet} />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
           <View>
             <Text style={styles.tabTitle}>PULSE</Text>
             <Text style={styles.mainTitle}>System Status</Text>
           </View>
           <View style={styles.uptimeBadge}>
              <Text style={styles.uptimeText}>UPTIME: 99.99%</Text>
           </View>
        </View>

        {/* WEB-STYLE STATUS CARDS */}
        <View style={styles.statsGrid}>
           <View style={styles.statBox}>
              <Text style={styles.statVal}>{pulseCount}</Text>
              <Text style={styles.statLabel}>TOTAL PULSES</Text>
              <Zap size={14} color={COLORS.primary} style={styles.boxIcon} />
           </View>
           <View style={styles.statBox}>
              <Text style={styles.statValSmall}>{lastHeartbeat === 'Never' ? 'N/A' : lastHeartbeat.split(',')[0]}</Text>
              <Text style={styles.statLabel}>LAST SIGN</Text>
              <History size={14} color={COLORS.secondary} style={styles.boxIcon} />
           </View>
           <View style={styles.statBox}>
              <Text style={[styles.statStatus, { color: COLORS.accent }]}>ACTIVE</Text>
              <Text style={styles.statLabel}>PROTOCOL</Text>
              <CheckCircle2 size={14} color={COLORS.accent} style={styles.boxIcon} />
           </View>
        </View>

        {/* MAIN PULSE CONSOLE */}
        <View style={styles.consoleCard}>
           <View style={styles.consoleHeader}>
              <Text style={styles.consoleTitle}>Protocol Console</Text>
              <Clock size={16} color={COLORS.textDim} />
           </View>

           <View style={styles.displayArea}>
              <Text style={styles.displayLabel}>LAST VERIFIED PULSE</Text>
              <Text style={styles.largeTime}>{lastHeartbeat.split(',')[1] || '--:--:--'}</Text>
              <View style={styles.syncRow}>
                 <ActivityIndicator size="small" color={COLORS.primary} />
                 <Text style={styles.syncText}>AWAITING NEXT SEQUENCE</Text>
              </View>
           </View>

           <TouchableOpacity 
              style={[styles.pulseBtn, isLoading && { opacity: 0.7 }]} 
              onPress={handlePulse}
              disabled={isLoading}
            >
              <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.pulseGradient}>
                 {isLoading ? (
                   <ActivityIndicator color="#fff" />
                 ) : (
                   <>
                     <Fingerprint size={24} color="#fff" />
                     <Text style={styles.pulseBtnText}>EMIT PULSE SIGNAL</Text>
                   </>
                 )}
              </LinearGradient>
           </TouchableOpacity>
        </View>

        {/* FREQUENCY CARD */}
        <View style={styles.configCard}>
           <View style={styles.configInfo}>
              <Calendar size={20} color={COLORS.primary} />
              <View>
                 <Text style={styles.configTitle}>Pulse Frequency</Text>
                 <Text style={styles.configSub}>Standard 30-Day Protocol</Text>
              </View>
           </View>
           <View style={styles.configBadge}>
              <Text style={styles.configBadgeText}>DEFAULT</Text>
           </View>
        </View>

        {/* HISTORY LIST */}
        <Text style={styles.historyHeader}>HISTORICAL SIGNALS</Text>
        <View style={styles.historyList}>
           {pulseCount === 0 ? (
             <View style={styles.emptyBox}>
                <AlertCircle size={32} color={COLORS.surfaceLight} />
                <Text style={styles.emptyText}>No historical pings recorded</Text>
             </View>
           ) : (
             <View style={styles.historyContainer}>
                {history.slice(0, 5).map((log, i) => (
                   <View key={log.id} style={styles.historyItem}>
                      <View style={styles.historyLeading}>
                         <View style={styles.pulseIndicator} />
                         <Text style={styles.historyTitle}>PULSE_{log.id.toString().slice(-6)}</Text>
                      </View>
                      <Text style={styles.historyDate}>{new Date(log.timestamp).toLocaleDateString()}</Text>
                   </View>
                ))}
             </View>
           )}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: GAPS.lg },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingVertical: 12 },
  tabTitle: { color: COLORS.textDim, fontFamily: FONTS.orbitron.bold, fontSize: 10, letterSpacing: 2 },
  mainTitle: { color: COLORS.text, fontSize: 24, fontFamily: FONTS.orbitron.black, marginTop: 4 },
  uptimeBadge: { backgroundColor: COLORS.surface, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border },
  uptimeText: { color: COLORS.accent, fontSize: 8, fontFamily: FONTS.orbitron.bold },

  statsGrid: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  statBox: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 16, padding: 12, borderWidth: 1, borderColor: COLORS.border, position: 'relative' },
  statLabel: { color: COLORS.textDim, fontSize: 7, fontFamily: FONTS.orbitron.bold, marginTop: 4, letterSpacing: 0.5 },
  statVal: { color: COLORS.text, fontSize: 20, fontFamily: FONTS.orbitron.black },
  statValSmall: { color: COLORS.text, fontSize: 11, fontFamily: FONTS.orbitron.bold },
  statStatus: { fontSize: 14, fontFamily: FONTS.orbitron.black },
  boxIcon: { position: 'absolute', top: 10, right: 10, opacity: 0.4 },

  consoleCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: COLORS.border, marginBottom: 20 },
  consoleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  consoleTitle: { color: COLORS.textMuted, fontSize: 10, fontFamily: FONTS.orbitron.bold, letterSpacing: 1 },
  displayArea: { alignItems: 'center', marginBottom: 40 },
  displayLabel: { color: COLORS.textDim, fontSize: 9, fontFamily: FONTS.inter.bold, letterSpacing: 1, marginBottom: 16 },
  largeTime: { color: COLORS.text, fontSize: 44, fontFamily: FONTS.orbitron.black, letterSpacing: -2 },
  syncRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16 },
  syncText: { color: COLORS.primary, fontSize: 8, fontFamily: FONTS.orbitron.bold, letterSpacing: 1 },

  pulseBtn: { height: 64, borderRadius: 16, overflow: 'hidden', ...SHADOWS.blue },
  pulseGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  pulseBtnText: { color: '#fff', fontSize: 15, fontFamily: FONTS.orbitron.bold, letterSpacing: 1 },

  configCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surface, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, marginBottom: 24 },
  configInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  configTitle: { color: COLORS.text, fontSize: 14, fontFamily: FONTS.inter.bold },
  configSub: { color: COLORS.textDim, fontSize: 10, fontFamily: FONTS.inter.medium, marginTop: 1 },
  configBadge: { backgroundColor: COLORS.borderLight, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  configBadgeText: { color: COLORS.textMuted, fontSize: 8, fontFamily: FONTS.inter.bold },

  historyHeader: { color: COLORS.textDim, fontSize: 10, fontFamily: FONTS.orbitron.bold, letterSpacing: 1, marginBottom: 12 },
  historyList: { gap: 10 },
  historyContainer: { gap: 8 },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surface, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border },
  historyLeading: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  pulseIndicator: { width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.accent },
  historyTitle: { color: COLORS.text, fontSize: 11, fontFamily: 'monospace' },
  historyDate: { color: COLORS.textDim, fontSize: 10, fontFamily: FONTS.inter.medium },
  emptyBox: { padding: 40, alignItems: 'center', gap: 12 },
  emptyText: { color: COLORS.textDim, fontSize: 12, fontFamily: FONTS.inter.medium },
});

export default HeartbeatScreen;