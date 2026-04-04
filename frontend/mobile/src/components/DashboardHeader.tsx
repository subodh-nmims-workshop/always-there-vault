import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Shield, ChevronDown, Key } from 'lucide-react-native';
import { COLORS, FONTS, RADIUS, GAPS } from '../theme';

interface DashboardHeaderProps {
  walletAddress: string;
}

import { LinearGradient } from 'expo-linear-gradient';

const DashboardHeader = ({ walletAddress }: DashboardHeaderProps) => {
  const shortAddress = walletAddress 
    ? `${walletAddress.slice(0, 10)}...${walletAddress.slice(-4)}` 
    : '0x...';

  return (
    <View style={styles.container}>
      {/* Account Badge */}
      <View style={styles.card}>
        <LinearGradient 
          colors={['rgba(255,255,255,0.05)', 'transparent']} 
          style={StyleSheet.absoluteFill} 
        />
        <View style={styles.accountRow}>
          <View style={styles.iconBox}>
            <Key size={14} color={COLORS.primary} strokeWidth={2.5} />
          </View>
          <View>
            <Text style={styles.label}>KERNEL INSTANCE</Text>
            <View style={styles.addressRow}>
              <Text style={styles.address}>{shortAddress}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Storage Tier Badge */}
      <TouchableOpacity style={styles.nodeCard}>
        <LinearGradient 
          colors={['rgba(16, 185, 129, 0.05)', 'transparent']} 
          style={StyleSheet.absoluteFill} 
        />
        <View style={styles.nodeIconBox}>
          <Shield size={16} color={COLORS.accent} strokeWidth={2.5} />
        </View>
        <View style={styles.nodeInfo}>
            <Text style={styles.tierLabel}>NETWORK STATUS</Text>
            <View style={styles.statusRow}>
                <View style={[styles.activeDot, { backgroundColor: COLORS.accent }]} />
                <Text style={styles.nodeType}>ENCRYPTED</Text>
            </View>
        </View>
        <ChevronDown size={14} color={COLORS.textDim} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GAPS.lg,
    paddingTop: 16, // More breathing room for status bar
    paddingBottom: GAPS.lg,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  card: {
    flex: 1.2,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 14,
    height: 70,
    justifyContent: 'center',
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: COLORS.textMuted,
    fontSize: 8,
    fontFamily: FONTS.orbitron.bold,
    letterSpacing: 0.5,
  },
  address: {
    color: COLORS.text,
    fontSize: 10,
    fontFamily: 'monospace',
    marginTop: 4,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  nodeCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 14,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nodeIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeInfo: {
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  tierLabel: {
    color: COLORS.textDim,
    fontSize: 7,
    fontFamily: FONTS.inter.bold,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  nodeType: {
    color: COLORS.text,
    fontSize: 10,
    fontFamily: FONTS.inter.bold,
    marginTop: 2,
  },
});

export default DashboardHeader;
