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
import { ArrowLeft, CheckCircle2, Shield } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, RADIUS, GAPS, SHADOWS } from '../theme';

const PLANS = [
  {
    name: 'Vault Lite',
    price: 'Free',
    features: ['500 MB Secure Storage', '1 Nominee / Beneficiary', 'Centralized Primary Backup', 'Standard Heartbeat'],
    color: COLORS.textDim
  },
  {
    name: 'Vault Pro',
    price: '$9/mo',
    popular: true,
    features: ['50 GB Encrypted Storage', '5 Nominees / Recovery Quorum', 'Full IPFS Sharding (SSS)', 'Priority Relayer Service'],
    color: COLORS.primary
  },
  {
    name: 'Vault Enterprise',
    price: '$49/mo',
    features: ['Unlimited Data Storage', 'Unlimited Nominees', 'Institutional Relayer Nodes', 'Legal Verification Layer'],
    color: COLORS.secondary
  }
];

const SubscriptionScreen = ({ onBack, visible = false }: { onBack: () => void, visible?: boolean }) => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <ArrowLeft size={24} color={COLORS.textDim} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
             <Shield size={20} color={COLORS.primary} style={{ marginRight: 8 }} />
             <Text style={styles.title}>VAULT CLEARANCE</Text>
          </View>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView 
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.intro}>Upgrade your clearance level to enhance protocol capacity and decentralized storage node access.</Text>

          {PLANS.map((plan, i) => (
            <View key={i} style={[styles.planCard, plan.popular && styles.popularCard]}>
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>RECOMMENDED</Text>
                </View>
              )}
              
              <View style={styles.cardHeader}>
                 <Text style={[styles.planName, { color: plan.popular ? COLORS.text : plan.color }]}>{plan.name}</Text>
                 <Text style={[styles.planPrice, { color: plan.popular ? COLORS.primary : COLORS.textMuted }]}>{plan.price}</Text>
              </View>
              
              <View style={styles.featureList}>
                {plan.features.map((f, j) => (
                  <View key={j} style={styles.featureItem}>
                    <CheckCircle2 size={16} color={plan.popular ? COLORS.primary : COLORS.textDim} />
                    <Text style={[styles.featureText, { color: plan.popular ? COLORS.text : COLORS.textMuted }]}>{f}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity activeOpacity={0.8} style={styles.planBtnContainer}>
                {plan.popular ? (
                  <LinearGradient
                    colors={[COLORS.primary, '#2563eb']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.planBtnGradient}
                  >
                    <Text style={[styles.planBtnText, { color: '#fff' }]}>INITIALIZE {plan.name.toUpperCase()}</Text>
                  </LinearGradient>
                ) : (
                  <View style={[styles.planBtn, { backgroundColor: COLORS.surfaceLight }]}>
                    <Text style={[styles.planBtnText, { color: COLORS.textMuted }]}>INITIALIZE {plan.name.toUpperCase()}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}
          
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
  intro: { color: COLORS.textMuted, fontSize: 13, fontFamily: FONTS.inter.medium, textAlign: 'center', marginBottom: GAPS.xl, lineHeight: 20 },
  
  planCard: { 
    backgroundColor: COLORS.surface, 
    borderRadius: RADIUS.xl, 
    padding: GAPS.xl, 
    marginBottom: GAPS.xl, 
    borderWidth: 1, 
    borderColor: COLORS.border 
  },
  popularCard: { 
    borderColor: COLORS.primary + '50', 
    borderWidth: 1.5, 
    ...SHADOWS.blue 
  },
  popularBadge: { 
    position: 'absolute', 
    top: -12, 
    alignSelf: 'center', 
    backgroundColor: COLORS.primary, 
    paddingHorizontal: 16, 
    paddingVertical: 6, 
    borderRadius: RADIUS.md 
  },
  popularText: { color: '#fff', fontSize: 9, fontFamily: FONTS.orbitron.bold, letterSpacing: 1.5 },
  
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: GAPS.xl, paddingTop: 4 },
  planName: { fontSize: 20, fontFamily: FONTS.orbitron.black },
  planPrice: { fontSize: 20, fontFamily: FONTS.inter.black },
  
  featureList: { marginBottom: GAPS.xl },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: GAPS.md, gap: 12 },
  featureText: { fontSize: 13, fontFamily: FONTS.inter.bold },
  
  planBtnContainer: { borderRadius: RADIUS.lg, overflow: 'hidden' },
  planBtnGradient: { paddingVertical: 18, alignItems: 'center' },
  planBtn: { paddingVertical: 18, alignItems: 'center' },
  planBtnText: { fontSize: 12, fontFamily: FONTS.orbitron.bold, letterSpacing: 1 }
});

export default SubscriptionScreen;
