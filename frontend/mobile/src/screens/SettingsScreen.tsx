import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  ShieldCheck, 
  Fingerprint, 
  Bell, 
  Eye, 
  FileText, 
  Map, 
  Scale, 
  LifeBuoy, 
  LogOut, 
  ChevronRight,
  Wallet,
  Globe,
  Lock,
  Zap,
  Check
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { COLORS, FONTS, RADIUS, GAPS, SHADOWS } from '../theme';
import ProtocolAlert from '../components/ProtocolAlert';
import ProtocolModal from '../components/ProtocolModal';

const SettingsScreen = ({ onLogout }: { onLogout: () => void }) => {
  const [bioEnabled, setBioEnabled] = useState(true);
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [interval, setInterval] = useState(30);
  const [showIntervalPicker, setShowIntervalPicker] = useState(false);
  
  const [alert, setAlert] = useState<{visible: boolean, title: string, message: string, type: 'success'|'error'|'info'|'confirm'}>({
    visible: false, title: '', message: '', type: 'info'
  });

  const showAlert = (title: string, message: string, type: 'success'|'error'|'info'|'confirm' = 'info') => {
    setAlert({ visible: true, title, message, type });
  };

  const copyWallet = async () => {
    await Clipboard.setStringAsync('0x742d13103c8e9b36c84b3e89c363c8e9b36c84b3');
    showAlert('IDENTITY COPIED', 'Protocol address saved to local clipboard successfully.', 'success');
  };

  const handleLogout = () => {
    setAlert({
      visible: true,
      title: 'TERMINATE SESSION',
      message: 'Are you certain? Your local encryption buffer will be purged to prevent unauthorized access.',
      type: 'confirm'
    });
  };

  const confirmLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['dwp_wallet_address', 'dwp_security_pin', 'dwp_auth_token', 'dwp_user_profile', 'dwp_setup_complete']);
      onLogout();
    } catch (e) {}
  };

  const SettingCard = ({ children, title }: any) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );

  const SettingRow = ({ icon: IconComp, title, subtitle, onPress, right, color = COLORS.textMuted }: any) => (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7} disabled={!onPress}>
      <View style={[styles.iconBox, { backgroundColor: color + '10' }]}>
        <IconComp size={20} color={color} />
      </View>
      <View style={styles.textCol}>
        <Text style={styles.rowTitle}>{title}</Text>
        {subtitle && <Text style={styles.rowSubtitle}>{subtitle}</Text>}
      </View>
      {right || <ChevronRight size={18} color={COLORS.textDim} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── IDENTITY & PLAN ──────────────────────────────── */}
        <SettingCard title="PROTOCOL IDENTITY">
           <TouchableOpacity style={styles.planHeader} activeOpacity={0.9}>
              <View>
                <Text style={styles.planBadgeText}>CURRENT CLEARANCE</Text>
                <Text style={styles.planName}>Lite Protocol</Text>
              </View>
              <View style={styles.upgradeBtn}>
                 <Zap size={14} color="#fff" style={{marginRight: 6}} />
                 <Text style={styles.upgradeText}>UPGRADE</Text>
              </View>
           </TouchableOpacity>
           <SettingRow 
              icon={Wallet} 
              title="Identity Address" 
              subtitle="0x742d...3c8e (Copy Hex)" 
              color={COLORS.primary}
              onPress={copyWallet}
           />
        </SettingCard>

        {/* ── SECURITY ────────────────────────────────────── */}
        <SettingCard title="VAULT SECURITY">
           <SettingRow 
              icon={Fingerprint} 
              title="Biometric Override" 
              subtitle="Hardware authentication"
              color={COLORS.accent}
              right={<Switch value={bioEnabled} onValueChange={setBioEnabled} trackColor={{ true: COLORS.accent }} />}
           />
           <SettingRow icon={Lock} title="Rotate Security PIN" color={COLORS.secondary} />
           <SettingRow icon={ShieldCheck} title="Verify Master Keys" color={COLORS.warning} />
        </SettingCard>

        {/* ── CONFIG ──────────────────────────────────────── */}
        <SettingCard title="OPERATIONAL CONFIG">
           <SettingRow 
              icon={Globe} 
              title="Heartbeat Frequency" 
              subtitle={`${interval} Day Interval`} 
              color={COLORS.primary} 
              onPress={() => setShowIntervalPicker(true)}
           />
           <SettingRow 
              icon={Bell} 
              title="Push Notifications" 
              color={COLORS.secondary}
              right={<Switch value={notifEnabled} onValueChange={setNotifEnabled} trackColor={{ true: COLORS.secondary }} />}
           />
        </SettingCard>

        {/* ── RESOURCES ───────────────────────────────────── */}
        <SettingCard title="PROTOCOL RESOURCES">
           <SettingRow icon={FileText} title="Technical Whitepaper" color={COLORS.primary} />
           <SettingRow icon={Map} title="Development Roadmap" color={COLORS.secondary} />
           <SettingRow icon={Scale} title="Legal Compliance" color={COLORS.textMuted} />
           <SettingRow icon={LifeBuoy} title="Priority Support" color={COLORS.warning} />
        </SettingCard>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
           <LogOut size={20} color={COLORS.error} />
           <Text style={styles.logoutText}>TERMINATE SESSION</Text>
        </TouchableOpacity>

        <Text style={styles.version}>PROTOCOL CORE v2.0.4-STABLE</Text>
        <View style={{ height: 100 }} />
      </ScrollView>

      <ProtocolModal
        visible={showIntervalPicker}
        onClose={() => setShowIntervalPicker(false)}
        title="HEARTBEAT INTERVAL"
      >
        <Text style={styles.modalText}>Configure the maximum duration between cryptographic proof-of-life signatures.</Text>
        {[30, 60, 90, 180].map(val => (
          <TouchableOpacity 
            key={val} 
            style={styles.optBtn} 
            onPress={() => { setInterval(val); setShowIntervalPicker(false); }}
          >
            <Text style={[styles.optText, interval === val && { color: COLORS.primary }]}>{val} DAYS</Text>
            {interval === val && <Check size={20} color={COLORS.primary} />}
          </TouchableOpacity>
        ))}
      </ProtocolModal>

      <ProtocolAlert 
        visible={alert.visible}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({...alert, visible: false})}
        onConfirm={confirmLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: GAPS.lg, paddingTop: GAPS.lg },

  section: { marginBottom: GAPS.xl },
  sectionTitle: { 
    color: COLORS.textDim, 
    fontFamily: FONTS.orbitron.bold, 
    fontSize: 10, 
    letterSpacing: 2, 
    marginBottom: GAPS.md,
    marginLeft: GAPS.sm
  },
  
  card: { 
    backgroundColor: COLORS.surface, 
    borderRadius: RADIUS.xl, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: COLORS.border 
  },
  
  planHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: COLORS.primary + '10', 
    padding: GAPS.lg, 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.primary + '20' 
  },
  planBadgeText: { color: COLORS.primary, fontFamily: FONTS.orbitron.bold, fontSize: 9, letterSpacing: 1 },
  planName: { color: COLORS.text, fontFamily: FONTS.orbitron.black, fontSize: 18, marginTop: 4 },
  upgradeBtn: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary, 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    borderRadius: RADIUS.lg,
    ...SHADOWS.blue
  },
  upgradeText: { color: '#fff', fontFamily: FONTS.orbitron.bold, fontSize: 11, letterSpacing: 1 },

  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: GAPS.lg, 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.borderLight + '20' 
  },
  iconBox: { width: 44, height: 44, borderRadius: RADIUS.lg, alignItems: 'center', justifyContent: 'center' },
  textCol: { flex: 1, marginLeft: GAPS.md },
  rowTitle: { color: COLORS.text, fontFamily: FONTS.inter.bold, fontSize: 15 },
  rowSubtitle: { color: COLORS.textMuted, fontFamily: FONTS.inter.medium, fontSize: 12, marginTop: 2 },

  logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: GAPS.lg, 
    borderRadius: RADIUS.xl, 
    borderWidth: 1.5, 
    borderColor: COLORS.error + '40', 
    backgroundColor: COLORS.error + '10',
    gap: 12,
    marginBottom: GAPS.xl
  },
  logoutText: { color: COLORS.error, fontFamily: FONTS.orbitron.bold, fontSize: 14, letterSpacing: 1.5 },
  version: { color: COLORS.textDim, fontFamily: FONTS.orbitron.bold, fontSize: 9, textAlign: 'center', opacity: 0.5 },

  modalText: { color: COLORS.textMuted, fontFamily: FONTS.inter.medium, fontSize: 14, textAlign: 'center', marginBottom: GAPS.lg, lineHeight: 20 },
  optBtn: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: GAPS.lg, 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.borderLight + '30' 
  },
  optText: { color: COLORS.text, fontFamily: FONTS.orbitron.bold, fontSize: 14, letterSpacing: 1 },
});

export default SettingsScreen;