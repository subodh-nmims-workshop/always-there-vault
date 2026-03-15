import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Shield, ChevronDown, Key } from 'lucide-react-native';
import { COLORS, FONTS, RADIUS, GAPS } from '../theme';

interface DashboardHeaderProps {
  walletAddress: string;
}

const DashboardHeader = ({ walletAddress }: DashboardHeaderProps) => {
  const shortAddress = walletAddress 
    ? `${walletAddress.slice(0, 18)}...${walletAddress.slice(-4)}` 
    : '0x...';

  return (
    <View style={styles.container}>
      {/* Account Badge */}
      <View style={styles.card}>
        <View style={styles.accountRow}>
          <View style={styles.iconBox}>
            <Key size={14} color={COLORS.primary} />
          </View>
          <View>
            <Text style={styles.label}>ENCRYPTED VAULT INSTANCE</Text>
            <View style={styles.addressRow}>
              <Text style={styles.address}>{shortAddress}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Storage Tier Badge */}
      <TouchableOpacity style={styles.nodeCard}>
        <View style={styles.nodeIconBox}>
          <Shield size={16} color={COLORS.primary} />
        </View>
        <View style={styles.nodeInfo}>
          <View style={styles.tierRow}>
            <Text style={styles.tierLabel}>STORAGE TIER</Text>
            <View style={styles.activeDot} />
            <Text style={styles.activeLabel}>ACTIVE</Text>
          </View>
          <Text style={styles.nodeType}>Centralized Node</Text>
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
  tierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tierLabel: {
    color: COLORS.textDim,
    fontSize: 7,
    fontFamily: FONTS.inter.bold,
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.accent,
  },
  activeLabel: {
    color: COLORS.accent,
    fontSize: 7,
    fontFamily: FONTS.inter.bold,
  },
  nodeType: {
    color: COLORS.text,
    fontSize: 10,
    fontFamily: FONTS.inter.bold,
    marginTop: 2,
  },
});

export default DashboardHeader;
