import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Shield, 
  Wallet, 
  Fingerprint, 
  Key, 
  Lock, 
  Plus, 
  ArrowLeft, 
  ChevronRight,
  Delete,
  CheckCircle2,
  AlertTriangle,
  Link2
} from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import ApiService from '../services/ApiService';
import ProtocolAlert from '../components/ProtocolAlert';
import { COLORS, FONTS, RADIUS, SHADOWS, GAPS } from '../theme';

const { width } = Dimensions.get('window');

// Keys
const PIN_KEY = 'dwp_security_pin';
const WALLET_KEY = 'dwp_wallet_address';

const SUPPORTED_WALLETS = [
  { id: 'protocol', name: 'Identity Protocol', icon: Shield, color: COLORS.primary, desc: 'Secure Native Vault' },
  { id: 'metamask', name: 'MetaMask', icon: Wallet, color: '#f6851b', desc: 'Secure Browser Link' },
  { id: 'rainbow', name: 'Rainbow', icon: Link2, color: '#387aff', desc: 'Optimized Mobile UX' },
  { id: 'trust', name: 'Trust Wallet', icon: Shield, color: '#3375bb', desc: 'Multi-Chain' },
];

interface LoginScreenProps {
  mode: 'wallet_auth' | 'setup_security' | 'app_unlock';
  onSuccess: (wallet: string) => void;
  onBack?: () => void;
}

const LoginScreen = ({ mode, onSuccess, onBack }: LoginScreenProps) => {
  const [walletSubMode, setWalletSubMode] = useState<'choice' | 'list' | 'import' | 'create'>('choice');
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [wallet, setWallet] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [bioAvailable, setBioAvailable] = useState(false);
  const [generatedSeed, setGeneratedSeed] = useState<string[]>([]);
  
  const [alert, setAlert] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'confirm';
    onConfirm?: () => void;
  }>({ visible: false, title: '', message: '', type: 'info' });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    checkBio();
  }, [walletSubMode]);

  const checkBio = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setBioAvailable(hasHardware && isEnrolled);
    if (mode === 'app_unlock' && hasHardware && isEnrolled) handleBiometric();
  };

  const handleBiometric = async () => {
    const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Access Protocol Vault' });
    if (result.success) {
      const savedWallet = await AsyncStorage.getItem(WALLET_KEY);
      onSuccess(savedWallet || 'connected_user');
    }
  };

  const generateWallet = () => {
    setLoading(true);
    setTimeout(() => {
      const mockSeed = ["logic", "vault", "crypto", "shield", "decent", "protocol", "inherit", "secure", "pulse", "guard", "chain", "will"];
      const mockAddr = "0x" + Math.random().toString(16).slice(2, 12) + "..." + Math.random().toString(16).slice(2, 6);
      setGeneratedSeed(mockSeed);
      setWallet(mockAddr);
      setLoading(false);
    }, 1500);
  };

  const handleFinalizeWallet = async () => {
    if (!wallet) return;
    setLoading(true);
    try {
      await AsyncStorage.setItem(WALLET_KEY, wallet);
      const api = ApiService.getInstance();
      await api.loginWithWallet(wallet);
      onSuccess(wallet);
    } catch (e) {
      setAlert({
        visible: true,
        title: 'PROTOCOL LINK FAILED',
        message: 'Unable to establish identity bridge. Verify network status and try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const renderChoice = () => (
    <View style={styles.content}>
      <Text style={styles.title}>IDENTITY PROTOCOL</Text>
      <Text style={styles.subtitle}>Initialize your decentralized identity to access the global inheritance network.</Text>
      
      <TouchableOpacity style={styles.choiceCard} onPress={() => setWalletSubMode('create')}>
        <LinearGradient colors={[COLORS.accent + '20', COLORS.accent + '05']} style={styles.choiceIconBox}>
          <Plus size={24} color={COLORS.accent} />
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text style={styles.choiceTitle}>Generate Identity</Text>
          <Text style={styles.choiceDesc}>Create new technical inheritance keys</Text>
        </View>
        <ChevronRight size={20} color={COLORS.textDim} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.choiceCard} onPress={() => {
        setLoading(true);
        setSelectedWalletId('rainbow');
        setTimeout(() => {
          setWallet('0x387affcb2e6462c051a85e4db8d3d92828b4b8');
          setWalletSubMode('import');
          setLoading(false);
        }, 1200);
      }}>
        <LinearGradient colors={['rgba(56, 122, 255, 0.2)', 'rgba(56, 122, 255, 0.05)']} style={styles.choiceIconBox}>
          {loading && selectedWalletId === 'rainbow' ? (
            <ActivityIndicator color="#387aff" size="small" />
          ) : (
            <Link2 size={24} color="#387aff" />
          )}
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text style={[styles.choiceTitle, { color: '#387aff' }]}>Rainbow Wallet</Text>
          <Text style={styles.choiceDesc}>Direct Mobile Connection (Recommended)</Text>
        </View>
        <ChevronRight size={20} color={COLORS.textDim} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.choiceCard} onPress={() => setWalletSubMode('list')}>
        <LinearGradient colors={[COLORS.primary + '20', COLORS.primary + '05']} style={styles.choiceIconBox}>
          <Wallet size={24} color={COLORS.primary} />
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text style={styles.choiceTitle}>Other Wallets</Text>
          <Text style={styles.choiceDesc}>MetaMask, Trust or Public ID</Text>
        </View>
        <ChevronRight size={20} color={COLORS.textDim} />
      </TouchableOpacity>
    </View>
  );

  const renderPin = () => (
    <Animated.View style={[styles.content, { transform: [{ translateX: shakeAnim }] }]}>
      <Text style={styles.title}>
        {mode === 'app_unlock' ? 'ACCESS VAULT' : (confirmPin ? 'CONFIRM PIN' : 'DEVICE SECURITY')}
      </Text>
      <Text style={styles.subtitle}>Technical PIN required to unlock local encryption buffer.</Text>
      
      <View style={styles.pinIndicatorRow}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <View key={i} style={[styles.pinDot, pin.length > i && (confirmPin ? styles.pinDotGreen : styles.pinDotPrimary)]} />
        ))}
      </View>

      <View style={styles.numpad}>
        {['1','2','3','4','5','6','7','8','9','C','0','⌫'].map(key => (
          <TouchableOpacity key={key} style={styles.numBtn} onPress={() => {
            if (key === '⌫') setPin(p => p.slice(0, -1));
            else if (key === 'C') setPin('');
            else if (pin.length < 6) setPin(p => p + key);
          }}>
            <Text style={styles.numText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity  
        style={[styles.primaryBtn, { opacity: pin.length >= 4 ? 1 : 0.5 }]} 
        onPress={() => {
          if (mode === 'app_unlock') {
            AsyncStorage.getItem(PIN_KEY).then(saved => {
              if (pin === saved) onSuccess(wallet || 'user');
              else { shake(); setPin(''); }
            });
          } else {
             if (!confirmPin) { setConfirmPin(pin); setPin(''); }
             else if (pin === confirmPin) { AsyncStorage.setItem(PIN_KEY, pin); onSuccess(wallet); }
             else { shake(); setPin(''); setConfirmPin(''); }
          }
        }}>
        <Text style={styles.primaryBtnText}>AUTHORIZE ACCESS</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <View style={styles.topBar}>
            {((walletSubMode !== 'choice' && mode === 'wallet_auth') || (onBack && walletSubMode === 'choice')) && (
              <TouchableOpacity onPress={() => {
                if (walletSubMode === 'list') setWalletSubMode('choice');
                else if (walletSubMode === 'create' || walletSubMode === 'import') setWalletSubMode('list');
                else if (onBack) onBack();
              }} style={{ padding: 8 }}>
                <ArrowLeft size={24} color={COLORS.textMuted} />
              </TouchableOpacity>
            )}
            <View style={styles.headerTitleContainer}>
               <Shield size={24} color={COLORS.primary} />
               <Text style={styles.headerLabel}>PROTOCOL KERNEL v2.0</Text>
            </View>
          </View>
          
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
             {mode === 'wallet_auth' ? (
                walletSubMode === 'choice' ? renderChoice() : 
                walletSubMode === 'list' ? (
                  <View style={styles.content}>
                    <Text style={styles.title}>SELECT PROVIDER</Text>
                    <View style={styles.grid}>
                      {SUPPORTED_WALLETS.map(w => (
                        <TouchableOpacity 
                          key={w.id} 
                          style={styles.providerCard}
                          onPress={() => {
                            if (w.id === 'protocol') setWalletSubMode('create');
                            else {
                               setLoading(true);
                               setSelectedWalletId(w.id);
                               setTimeout(() => {
                                 let addr = '0x';
                                 if (w.id === 'metamask') addr = '0x742d13f0cc6634c051a85e4db8d3d92828b4b3';
                                 else if (w.id === 'rainbow') addr = '0x387affcb2e6462c051a85e4db8d3d92828b4b8';
                                 else if (w.id === 'trust') addr = '0xcba42d13f0cc6634c051a85e4db8d3d92828b4c0';
                                 else addr = '0x9d2828b4b3742d13f0cc6634c051a85e4db8d3d';
                                 
                                 setWallet(addr);
                                 setWalletSubMode('import');
                                 setLoading(false);
                               }, 1200);
                            }
                          }}
                        >
                          {loading && selectedWalletId === w.id ? (
                            <ActivityIndicator color={w.color} size="small" />
                          ) : (
                            <w.icon size={32} color={w.color} />
                          )}
                          <Text style={styles.providerName}>{w.name}</Text>
                          <Text style={{ color: COLORS.textDim, fontSize: 8, marginTop: 4 }}>{w.desc}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    <TouchableOpacity onPress={() => setWalletSubMode('choice')} style={styles.backBtn}>
                      <Text style={styles.backBtnText}>BACK TO CORE</Text>
                    </TouchableOpacity>
                  </View>
                ) :
                walletSubMode === 'create' ? (
                  <View style={styles.content}>
                    <Text style={styles.title}>GENERATED ENTROPY</Text>
                    <Text style={styles.subtitle}>Copy these recovery shards to a physical medium. Protocol does not store these shards.</Text>
                    
                    {generatedSeed.length === 0 ? (
                      <TouchableOpacity style={styles.primaryBtn} onPress={generateWallet}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryBtnText}>GENERATE KEYS</Text>}
                      </TouchableOpacity>
                    ) : (
                      <>
                        <View style={styles.seedContainer}>
                          {generatedSeed.map((word, i) => (
                            <View key={i} style={styles.seedBadge}>
                              <Text style={styles.seedIdx}>{i + 1}</Text>
                              <Text style={styles.seedTxt}>{word}</Text>
                            </View>
                          ))}
                        </View>
                        <TouchableOpacity style={styles.primaryBtn} onPress={handleFinalizeWallet}>
                          <Text style={styles.primaryBtnText}>KEYS SECURED</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                ) : (
                  <View style={styles.content}>
                    <Text style={styles.title}>IMPORT IDENTITY</Text>
                    <View style={styles.inputContainer}>
                      <Link2 size={20} color={COLORS.primary} />
                      <TextInput
                        style={styles.input}
                        placeholder="0x... (PUBLIC ADDRESS)"
                        placeholderTextColor={COLORS.textDim}
                        value={wallet}
                        onChangeText={setWallet}
                        autoCapitalize="none"
                      />
                    </View>
                    <TouchableOpacity style={styles.primaryBtn} onPress={handleFinalizeWallet}>
                      <Text style={styles.primaryBtnText}>CONNECT BRIDGE</Text>
                    </TouchableOpacity>
                  </View>
                )
             ) : renderPin()}
          </ScrollView>
          
          {mode === 'app_unlock' && bioAvailable && (
            <TouchableOpacity style={styles.bioContainer} onPress={handleBiometric}>
              <Fingerprint size={48} color={COLORS.primary} />
              <Text style={styles.bioLabel}>BIOMETRIC OVERRIDE</Text>
            </TouchableOpacity>
          )}

          <ProtocolAlert 
            visible={alert.visible}
            title={alert.title}
            message={alert.message}
            type={alert.type as any}
            onClose={() => setAlert({ ...alert, visible: false })}
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  topBar: { padding: GAPS.lg, flexDirection: 'row', alignItems: 'center' },
  headerTitleContainer: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginRight: 24 },
  headerLabel: { color: COLORS.textMuted, fontFamily: FONTS.orbitron.bold, fontSize: 10, letterSpacing: 2 },
  
  content: { flex: 1, paddingHorizontal: GAPS.lg, justifyContent: 'center' },
  title: { color: COLORS.text, fontFamily: FONTS.orbitron.black, fontSize: 28, textAlign: 'center', letterSpacing: 1 },
  subtitle: { color: COLORS.textMuted, fontFamily: FONTS.inter.medium, fontSize: 13, textAlign: 'center', marginTop: GAPS.md, marginBottom: GAPS.xl, lineHeight: 20 },
  
  choiceCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.surface, 
    padding: GAPS.lg, 
    borderRadius: RADIUS.xl, 
    marginBottom: GAPS.md, 
    borderWidth: 1, 
    borderColor: COLORS.border 
  },
  choiceIconBox: { width: 50, height: 50, borderRadius: RADIUS.lg, justifyContent: 'center', alignItems: 'center', marginRight: GAPS.md },
  choiceTitle: { color: COLORS.text, fontFamily: FONTS.inter.bold, fontSize: 16 },
  choiceDesc: { color: COLORS.textDim, fontFamily: FONTS.inter.medium, fontSize: 12, marginTop: 2 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAPS.md, justifyContent: 'center', marginTop: GAPS.lg },
  providerCard: { 
    backgroundColor: COLORS.surface, 
    width: (width - (GAPS.lg * 2) - GAPS.md) / 2, 
    padding: GAPS.lg, 
    borderRadius: RADIUS.xl, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: COLORS.border 
  },
  providerName: { color: COLORS.text, fontFamily: FONTS.inter.bold, fontSize: 12, marginTop: 12 },

  seedContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: GAPS.xl },
  seedBadge: { backgroundColor: COLORS.surface, paddingHorizontal: 12, paddingVertical: 8, borderRadius: RADIUS.md, flexDirection: 'row', borderWidth: 1, borderColor: COLORS.border },
  seedIdx: { color: COLORS.primary, fontFamily: FONTS.orbitron.bold, fontSize: 10, marginRight: 6 },
  seedTxt: { color: COLORS.text, fontFamily: FONTS.inter.bold, fontSize: 13 },

  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, paddingHorizontal: GAPS.md, borderWidth: 1, borderColor: COLORS.border, marginBottom: GAPS.xl },
  input: { flex: 1, color: COLORS.text, paddingVertical: 18, fontSize: 14, fontFamily: FONTS.inter.medium, marginLeft: 10 },
  
  primaryBtn: { backgroundColor: COLORS.primary, paddingVertical: 18, borderRadius: RADIUS.lg, alignItems: 'center', ...SHADOWS.blue },
  primaryBtnText: { color: '#fff', fontFamily: FONTS.orbitron.black, fontSize: 14, letterSpacing: 2 },
  backBtn: { marginTop: GAPS.xl, alignItems: 'center' },
  backBtnText: { color: COLORS.textDim, fontFamily: FONTS.inter.bold, fontSize: 12, letterSpacing: 1 },

  pinIndicatorRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: GAPS.xl },
  pinDot: { width: 14, height: 14, borderRadius: RADIUS.full, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  pinDotPrimary: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  pinDotGreen: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  
  numpad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20, marginBottom: GAPS.xl },
  numBtn: { width: 70, height: 70, borderRadius: 35, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border },
  numText: { color: COLORS.text, fontFamily: FONTS.orbitron.bold, fontSize: 24 },
  
  bioContainer: { alignItems: 'center', paddingBottom: 40 },
  bioLabel: { color: COLORS.primary, fontFamily: FONTS.orbitron.bold, fontSize: 11, letterSpacing: 1, marginTop: 10 }
});

export default LoginScreen;
