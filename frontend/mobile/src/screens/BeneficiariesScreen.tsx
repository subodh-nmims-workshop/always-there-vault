import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  UserPlus, 
  Users, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  ArrowRight,
  Shield,
  Plus
} from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';
import DashboardHeader from '../components/DashboardHeader';
import ProtocolModal from '../components/ProtocolModal';
import ApiService from '../services/ApiService';
import { COLORS, FONTS, RADIUS, SHADOWS, GAPS } from '../theme';

const { width } = Dimensions.get('window');

const BeneficiariesScreen = ({ navigation }: any) => {
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
  const [wallet, setWallet] = useState('0x...');
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAddr, setNewAddr] = useState('');
  const [allocation, setAllocation] = useState('100');
  const [isProcessing, setIsProcessing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const api = ApiService.getInstance();
    const res = await api.getBeneficiaries();
    if (res.success && res.data) {
      setBeneficiaries(res.data);
    } else {
      // Fallback to local if backend fails but we have cached data
      const saved = await AsyncStorage.getItem('dwp_beneficiaries');
      if (saved) setBeneficiaries(JSON.parse(saved));
    }
    
    const w = await AsyncStorage.getItem('dwp_wallet_address');
    if (w) setWallet(w);
  };

  const handleAdd = async () => {
    if (!newName || !newAddr) return;
    setIsProcessing(true);
    
    const api = ApiService.getInstance();
    const res = await api.addBeneficiary({
      name: newName,
      walletAddress: newAddr,
      allocation: parseInt(allocation)
    });

    if (res.success) {
      // Refresh list from server
      await loadData();
      setNewName('');
      setNewAddr('');
      setShowAdd(false);
    } else {
      alert(res.error || 'Failed to authorize node');
    }
    setIsProcessing(false);
  };

  const totalAllocation = beneficiaries.reduce((acc, b) => acc + (b.allocation || 0), 0);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <DashboardHeader walletAddress={wallet} />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
           <View>
             <Text style={styles.tabTitle}>PROTEGE</Text>
             <Text style={styles.mainTitle}>Quorum Nodes</Text>
           </View>
           <TouchableOpacity style={styles.addButton} onPress={() => setShowAdd(true)}>
              <UserPlus size={18} color="#fff" />
              <Text style={styles.addButtonText}>Add Node</Text>
           </TouchableOpacity>
        </View>

        {/* WEB-STYLE STATS GRID */}
        <View style={styles.statsGrid}>
           <View style={styles.statBox}>
              <View style={styles.radialGroup}>
                 <Svg width={60} height={60} viewBox="0 0 36 36">
                    <Circle cx="18" cy="18" r="16" fill="none" stroke={COLORS.border} strokeWidth="3" />
                    <Circle 
                      cx="18" cy="18" r="16" fill="none" 
                      stroke={totalAllocation === 100 ? COLORS.primary : COLORS.warning} 
                      strokeWidth="3" 
                      strokeDasharray="100" strokeDashoffset={100 - totalAllocation} 
                      strokeLinecap="round"
                      transform="rotate(-90 18 18)"
                    />
                 </Svg>
                 <View style={styles.radialLabelBox}>
                    <Text style={styles.radialLabelText}>{totalAllocation}%</Text>
                 </View>
              </View>
              <Text style={styles.statLabel}>TOTAL ALLOCATED</Text>
           </View>

           <View style={styles.statBox}>
              <Text style={styles.statValLarge}>{beneficiaries.length.toString().padStart(2, '0')}</Text>
              <Text style={styles.statLabel}>ACTIVE NODES</Text>
              <Users size={16} color={COLORS.secondary} style={styles.boxIcon} />
           </View>

           <View style={styles.statBox}>
              <Text style={styles.statValMid}>{totalAllocation === 100 ? 'READY' : 'PENDING'}</Text>
              <Text style={styles.statLabel}>PROTOCOL STATUS</Text>
              <Clock size={16} color={COLORS.primary} style={styles.boxIcon} />
           </View>

           <View style={styles.statBox}>
              <View style={styles.statusRow}>
                 <View style={[styles.pulseDot, { backgroundColor: beneficiaries.length > 0 ? COLORS.accent : COLORS.textDim }]} />
                 <Text style={[styles.statValSmall, { color: beneficiaries.length > 0 ? COLORS.text : COLORS.textDim }]}>
                   {beneficiaries.length > 0 ? 'ACTIVE' : 'INACTIVE'}
                 </Text>
              </View>
              <Text style={styles.statLabel}>SECURITY STATUS</Text>
              <ShieldCheck size={16} color={COLORS.accent} style={styles.boxIcon} />
           </View>
        </View>

        {/* NODE LIST */}
        <View style={styles.listSection}>
           {beneficiaries.map((b, i) => (
             <View key={b.id} style={styles.nodeItem}>
                <View style={styles.nodeLeading}>
                   <View style={[styles.avatar, { backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981'][i % 3] + '20', borderColor: ['#3b82f6', '#8b5cf6', '#10b981'][i % 3] + '40' }]}>
                      <Text style={[styles.avatarText, { color: ['#3b82f6', '#8b5cf6', '#10b981'][i % 3] }]}>
                        {b.name.charAt(0).toUpperCase()}
                      </Text>
                   </View>
                   <View>
                      <Text style={styles.nodeName}>{b.name}</Text>
                      <Text style={styles.nodeAddr}>{b.walletAddress.slice(0, 10)}...{b.walletAddress.slice(-4)}</Text>
                   </View>
                </View>
                <View style={styles.nodeTrailing}>
                   <Text style={[styles.shareText, { color: COLORS.primary }]}>100% Share</Text>
                   <MoreVertical size={16} color={COLORS.textDim} />
                </View>
             </View>
           ))}

           {beneficiaries.length === 0 && (
             <View style={styles.emptyState}>
                <Users size={40} color={COLORS.surfaceLight} />
                <Text style={styles.emptyText}>No quorum nodes added yet</Text>
             </View>
           )}
        </View>

        {/* SECURITY CHECKLIST (Matching web sidebar card) */}
        <View style={styles.checklistCard}>
           <Text style={styles.checklistTitle}>Security Checklist</Text>
           <View style={styles.checkItem}>
              {beneficiaries.length > 0 ? <CheckCircle2 size={16} color={COLORS.accent} /> : <XCircle size={16} color={COLORS.textDim} />}
              <Text style={[styles.checkText, beneficiaries.length > 0 ? { color: COLORS.text } : { color: COLORS.textDim }]}>Beneficiaries configured</Text>
           </View>
           <View style={styles.checkItem}>
              {totalAllocation === 100 ? <CheckCircle2 size={16} color={COLORS.accent} /> : <XCircle size={16} color={COLORS.textDim} />}
              <Text style={[styles.checkText, totalAllocation === 100 ? { color: COLORS.text } : { color: COLORS.textDim }]}>Allocations total 100%</Text>
           </View>
           <View style={styles.checkItem}>
              <XCircle size={16} color={COLORS.textDim} />
              <Text style={[styles.checkText, { color: COLORS.textDim }]}>Emergency witness assigned</Text>
           </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      <ProtocolModal
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title="SECURE NEW PROTEGE"
        icon={UserPlus}
      >
        {isProcessing ? (
          <View style={styles.processing}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.procTitle}>SHARDING IDENTITY...</Text>
            <Text style={styles.procSub}>Distributing quorum keys to decentralized nodes</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 500 }}>
             <Text style={styles.modalSub}>Protocol Node Configuration</Text>

             <View style={{ marginBottom: 16 }}>
                <Text style={styles.inputLabel}>PROTEGE NAME</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Family Member / Lawyer"
                  placeholderTextColor={COLORS.textDim}
                  value={newName}
                  onChangeText={setNewName}
                />
             </View>

             <View style={{ marginBottom: 16 }}>
                <Text style={styles.inputLabel}>WALLET ADDRESS / PUBLIC ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0x..."
                  placeholderTextColor={COLORS.textDim}
                  value={newAddr}
                  onChangeText={setNewAddr}
                />
             </View>

             <View style={{ marginBottom: 24 }}>
                <Text style={styles.inputLabel}>ALLOCATION SHARE (%)</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="100"
                  placeholderTextColor={COLORS.textDim}
                  value={allocation}
                  onChangeText={setAllocation}
                />
             </View>

             <TouchableOpacity style={styles.primaryBtn} onPress={handleAdd}>
                <Text style={styles.primaryBtnText}>AUTHORIZE NODE</Text>
                <ArrowRight size={18} color="#fff" />
             </TouchableOpacity>
             <View style={{ height: 30 }} />
          </ScrollView>
        )}
      </ProtocolModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: GAPS.lg,
    marginBottom: 20
  },
  tabTitle: { color: COLORS.textDim, fontFamily: FONTS.orbitron.bold, fontSize: 10, letterSpacing: 2 },
  mainTitle: { color: COLORS.text, fontSize: 24, fontFamily: FONTS.orbitron.black, marginTop: 4 },
  addButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    ...SHADOWS.blue
  },
  addButtonText: { color: '#fff', fontSize: 12, fontFamily: FONTS.inter.bold },

  statsGrid: { paddingHorizontal: GAPS.lg, flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  statBox: {
    backgroundColor: COLORS.surface,
    width: (width - (GAPS.lg * 2) - 12) / 2,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center'
  },
  radialGroup: { alignItems: 'center', marginBottom: 12, position: 'relative' },
  radialLabelBox: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  radialLabelText: { color: COLORS.text, fontSize: 10, fontFamily: FONTS.orbitron.bold },
  statLabel: { color: COLORS.textMuted, fontSize: 8, fontFamily: FONTS.inter.bold, letterSpacing: 1 },
  statValLarge: { color: COLORS.text, fontSize: 32, fontFamily: FONTS.orbitron.black, marginBottom: 4 },
  statValMid: { color: COLORS.text, fontSize: 16, fontFamily: FONTS.orbitron.bold, marginBottom: 12 },
  statValSmall: { color: COLORS.text, fontSize: 12, fontFamily: FONTS.inter.bold, marginLeft: 6 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  pulseDot: { width: 8, height: 8, borderRadius: 4 },
  boxIcon: { position: 'absolute', top: 16, right: 16 },

  listSection: { paddingHorizontal: GAPS.lg, marginBottom: 24 },
  nodeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  nodeLeading: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 18, fontFamily: FONTS.orbitron.bold },
  nodeName: { color: COLORS.text, fontSize: 14, fontFamily: FONTS.inter.bold },
  nodeAddr: { color: COLORS.textDim, fontSize: 10, fontFamily: 'monospace', marginTop: 2 },
  nodeTrailing: { alignItems: 'flex-end', gap: 6 },
  shareText: { fontSize: 10, fontFamily: FONTS.orbitron.bold },

  emptyState: { alignItems: 'center', paddingVertical: 40, backgroundColor: COLORS.surface, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, borderStyle: 'dashed' },
  emptyText: { color: COLORS.textDim, fontSize: 12, fontFamily: FONTS.inter.medium, marginTop: 12 },

  checklistCard: { marginHorizontal: GAPS.lg, backgroundColor: COLORS.primary + '05', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: COLORS.primary + '20' },
  checklistTitle: { color: COLORS.text, fontSize: 16, fontFamily: FONTS.inter.bold, marginBottom: 20 },
  checkItem: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  checkText: { fontSize: 13, fontFamily: FONTS.inter.medium },

  inputLabel: { color: COLORS.textDim, fontSize: 10, fontFamily: FONTS.orbitron.bold, marginBottom: 10, marginTop: 4 },
  input: { backgroundColor: COLORS.background, height: 56, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, color: '#fff', paddingHorizontal: 16, fontFamily: FONTS.inter.medium, fontSize: 14 },
  modalSub: { color: COLORS.primary, fontSize: 11, fontFamily: FONTS.orbitron.bold, marginBottom: 24, textTransform: 'uppercase', letterSpacing: 1 },
  primaryBtn: { backgroundColor: COLORS.primary, height: 60, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 10 },
  primaryBtnText: { color: '#fff', fontSize: 15, fontFamily: FONTS.orbitron.black, letterSpacing: 1 },
  processing: { alignItems: 'center', paddingVertical: 40 },
  procTitle: { color: COLORS.text, fontSize: 18, fontFamily: FONTS.orbitron.black, marginTop: 24 },
  procSub: { color: COLORS.textDim, fontSize: 14, fontFamily: FONTS.inter.medium, marginTop: 10 },
});

export default BeneficiariesScreen;