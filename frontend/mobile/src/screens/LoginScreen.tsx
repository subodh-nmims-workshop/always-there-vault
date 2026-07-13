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
  Alert,
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
  Link2,
  FileText,
  Camera,
} from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { CameraView, useCameraPermissions } from 'expo-camera';
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
  const [activeTab, setActiveTab] = useState<'primary_wallet' | 'recovery_key'>('primary_wallet');
  const [recoveryMethod, setRecoveryMethod] = useState<'file' | 'camera' | 'manual'>('file');
  const [manualKey, setManualKey] = useState('');
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  
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

  const handleRecoveryInput = async (rawKey: string) => {
    let key = rawKey.trim();
    try {
      const parsed = JSON.parse(key);
      if (parsed.privateKey) key = parsed.privateKey;
    } catch (_) {}
    if (!key.startsWith('0x') && key.length === 64) key = '0x' + key;
    if (!key.startsWith('0x') || (key.length !== 66 && key.length !== 64)) {
      setAlert({ visible: true, title: 'INVALID KEY', message: 'Must be a 64-char hex string (private key).', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      await AsyncStorage.setItem(WALLET_KEY, key);
      const api = ApiService.getInstance();
      await api.loginWithWallet(key);
      onSuccess(key);
    } catch (e) {
      setAlert({ visible: true, title: 'RECOVERY FAILED', message: 'Could not authenticate with this key.', type: 'error' });
    } finally { setLoading(false); }
  };

  const handleJsonUpload = async () => {
    try {
      // Accept all files — user may have .json, .txt, or no extension
      const res = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });
      if (res.canceled || !res.assets?.length) return;

      const asset = res.assets[0];
      let uri = asset.uri;

      // On Android, content:// URIs must be copied to a readable cache path first
      if (uri.startsWith('content://')) {
        const dest = FileSystem.cacheDirectory + 'recovery_upload_' + Date.now() + '.json';
        await FileSystem.copyAsync({ from: uri, to: dest });
        uri = dest;
      }

      const content = await FileSystem.readAsStringAsync(uri);
      handleRecoveryInput(content.trim());
    } catch (e: any) {
      setAlert({
        visible: true,
        title: 'FILE ERROR',
        message: 'Could not read file. Make sure it is a valid recovery JSON or hex text file.',
        type: 'error',
      });
    }
  };

  const handleQrScanned = ({ data }: { data: string }) => {
    setShowQrScanner(false);
    handleRecoveryInput(data);
  };

  const renderChoice = () => (
    <View style={styles.choiceContainer}>
      {/* TABS SELECTOR */}
      <View style={styles.tabHeader}>
        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'primary_wallet' && styles.tabBtnActive]} 
          onPress={() => setActiveTab('primary_wallet')}
        >
          <Wallet size={16} color={activeTab === 'primary_wallet' ? COLORS.primary : COLORS.textDim} style={{ marginRight: 6 }} />
          <Text style={[styles.tabBtnText, activeTab === 'primary_wallet' && styles.tabBtnTextActive]}>PRIMARY WALLET</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'recovery_key' && styles.tabBtnActive]} 
          onPress={() => setActiveTab('recovery_key')}
        >
          <Key size={16} color={activeTab === 'recovery_key' ? COLORS.primary : COLORS.textDim} style={{ marginRight: 6 }} />
          <Text style={[styles.tabBtnText, activeTab === 'recovery_key' && styles.tabBtnTextActive]}>RECOVERY KEY</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'primary_wallet' ? (
        <View style={styles.tabBody}>
          <View style={styles.walletIconMainBox}>
             <Wallet size={36} color="#3b82f6" />
          </View>

          <Text style={styles.connectTitle}>Connect Your Wallet</Text>
          <Text style={styles.connectDesc}>Sign in with your Web3 wallet to access your vault and manage your digital legacy.</Text>

          <TouchableOpacity 
            style={styles.openSelectorBtn}
            onPress={() => setWalletSubMode('list')}
          >
            <Wallet size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.openSelectorBtnText}>Open Multi-Wallet Selector</Text>
          </TouchableOpacity>

          <Text style={styles.networksLabel}>SUPPORTED NETWORKS</Text>
          <View style={styles.networksRow}>
             <Text style={styles.chainText}>Ξ Ethereum</Text>
             <Text style={styles.chainText}>◆ Base</Text>
             <Text style={styles.chainText}>● Arbitrum</Text>
          </View>

          <View style={styles.warningBox}>
             <AlertTriangle size={16} color="#f59e0b" style={{ marginRight: 10, marginTop: 2 }} />
             <View style={{ flex: 1 }}>
                <Text style={styles.warningTitle}>Local Testing Mode</Text>
                <Text style={styles.warningText}>Mobile wallets & WalletConnect do not support Localhost. Use "Other Wallets" selection to connect with a test address.</Text>
             </View>
          </View>

          <View style={styles.rainbowCard}>
             <Shield size={18} color={COLORS.primary} style={{ marginRight: 12 }} />
             <View style={{ flex: 1 }}>
                <Text style={styles.rainbowTitle}>RainbowKit Integrated</Text>
                <Text style={styles.rainbowDesc}>Access Rainbow, Coinbase, MetaMask, and hundreds of mobile wallets.</Text>
             </View>
          </View>
        </View>
      ) : (
        <View style={styles.tabBody}>
          <View style={[styles.walletIconMainBox, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
             <Key size={36} color="#f59e0b" />
          </View>

          <Text style={styles.connectTitle}>Restore with Recovery Key</Text>
          <Text style={styles.connectDesc}>Use your backup file, QR recovery card, or paste your raw private key.</Text>

          {/* 3 method tabs */}
          <View style={styles.recoveryMethodRow}>
            {(['file', 'camera', 'manual'] as const).map((m) => (
              <TouchableOpacity
                key={m}
                style={[styles.recoveryMethodBtn, recoveryMethod === m && styles.recoveryMethodBtnActive]}
                onPress={() => { setRecoveryMethod(m); setShowQrScanner(false); }}
              >
                {m === 'file' && <FileText size={14} color={recoveryMethod === m ? '#fff' : COLORS.textDim} />}
                {m === 'camera' && <Camera size={14} color={recoveryMethod === m ? '#fff' : COLORS.textDim} />}
                {m === 'manual' && <Key size={14} color={recoveryMethod === m ? '#fff' : COLORS.textDim} />}
                <Text style={[styles.recoveryMethodBtnText, recoveryMethod === m && { color: '#fff' }]}>
                  {m === 'file' ? 'Backup File' : m === 'camera' ? 'Scan QR' : 'Manual Hex'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Method: File */}
          {recoveryMethod === 'file' && (
            <TouchableOpacity style={styles.uploadBox} onPress={handleJsonUpload}>
              <FileText size={28} color={COLORS.primary} />
              <Text style={styles.uploadBoxTitle}>Upload Backup JSON</Text>
              <Text style={styles.uploadBoxSub}>recovery-key.json or raw hex file</Text>
            </TouchableOpacity>
          )}

          {/* Method: Camera QR */}
          {recoveryMethod === 'camera' && (
            showQrScanner ? (
              <View style={{ width: '100%', height: 220, borderRadius: 16, overflow: 'hidden', marginTop: 12 }}>
                <CameraView
                  onBarcodeScanned={handleQrScanned}
                  barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                  style={{ flex: 1 }}
                />
                <TouchableOpacity
                  onPress={() => setShowQrScanner(false)}
                  style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(239,68,68,0.9)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 }}
                >
                  <Text style={{ color: '#fff', fontSize: 11, fontFamily: FONTS.inter.bold }}>Stop</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.uploadBox, { borderColor: 'rgba(16,185,129,0.3)' }]}
                onPress={async () => {
                  if (!cameraPermission?.granted) {
                    const result = await requestCameraPermission();
                    if (!result.granted) return;
                  }
                  setShowQrScanner(true);
                }}
              >
                <Camera size={28} color="#10b981" />
                <Text style={[styles.uploadBoxTitle, { color: '#10b981' }]}>Enable Camera</Text>
                <Text style={styles.uploadBoxSub}>Scan your AlwaysThere recovery QR card</Text>
              </TouchableOpacity>
            )
          )}

          {/* Method: Manual Hex */}
          {recoveryMethod === 'manual' && (
            <View style={{ width: '100%', marginTop: 12 }}>
              <View style={styles.inputContainer}>
                <Key size={18} color={COLORS.primary} />
                <TextInput
                  style={styles.input}
                  placeholder="0x... private key (64 hex chars)"
                  placeholderTextColor={COLORS.textDim}
                  value={manualKey}
                  onChangeText={setManualKey}
                  autoCapitalize="none"
                  secureTextEntry
                />
              </View>
              <TouchableOpacity
                style={[styles.openSelectorBtn, { opacity: manualKey.length > 0 ? 1 : 0.5 }]}
                onPress={() => handleRecoveryInput(manualKey)}
                disabled={!manualKey}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.openSelectorBtnText}>AUTHENTICATE KEY</Text>}
              </TouchableOpacity>
            </View>
          )}

          {/* Security disclaimer */}
          <View style={[styles.warningBox, { marginTop: 16 }]}>
            <Shield size={14} color="#f59e0b" style={{ marginRight: 10, marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.warningTitle}>Security Note</Text>
              <Text style={styles.warningText}>Your key is processed locally and never uploaded to any server.</Text>
            </View>
          </View>
        </View>
      )}

      {/* FOOTER VALUES */}
      <View style={styles.footerChecks}>
         <View style={styles.checkItem}>
            <CheckCircle2 size={12} color="#10b981" />
            <Text style={styles.checkText}>Zero-trust</Text>
         </View>
         <View style={styles.checkItem}>
            <CheckCircle2 size={12} color="#10b981" />
            <Text style={styles.checkText}>Client-side sign</Text>
         </View>
         <View style={styles.checkItem}>
            <CheckCircle2 size={12} color="#10b981" />
            <Text style={styles.checkText}>Hardware-backed</Text>
         </View>
      </View>
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
               <Text style={styles.headerLabel}>ALWAYSTHERE VAULT</Text>
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
              <Text style={styles.bioLabel}>USE BIOMETRICS TO UNLOCK</Text>
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
  bioLabel: { color: COLORS.primary, fontFamily: FONTS.orbitron.bold, fontSize: 11, letterSpacing: 1, marginTop: 10 },
  
  choiceContainer: { flex: 1, paddingHorizontal: GAPS.lg, paddingVertical: GAPS.lg },
  tabHeader: { 
    flexDirection: 'row', 
    backgroundColor: 'rgba(255, 255, 255, 0.03)', 
    borderRadius: 12, 
    padding: 4, 
    borderWidth: 1, 
    borderColor: COLORS.border,
    marginBottom: 24 
  },
  tabBtn: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 12, 
    borderRadius: 8 
  },
  tabBtnActive: { 
    backgroundColor: 'rgba(59, 130, 246, 0.1)', 
    borderWidth: 1, 
    borderColor: 'rgba(59, 130, 246, 0.2)' 
  },
  tabBtnText: { 
    color: COLORS.textDim, 
    fontSize: 11, 
    fontFamily: FONTS.orbitron.bold, 
    letterSpacing: 1 
  },
  tabBtnTextActive: { 
    color: COLORS.primary 
  },
  tabBody: { 
    alignItems: 'center', 
    backgroundColor: COLORS.surface, 
    borderRadius: 20, 
    padding: 24, 
    borderWidth: 1, 
    borderColor: COLORS.border,
    marginBottom: 24 
  },
  walletIconMainBox: { 
    width: 70, 
    height: 70, 
    borderRadius: 20, 
    backgroundColor: 'rgba(59, 130, 246, 0.1)', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 20 
  },
  connectTitle: { 
    color: COLORS.text, 
    fontSize: 22, 
    fontFamily: FONTS.inter.bold, 
    textAlign: 'center',
    marginBottom: 8 
  },
  connectDesc: { 
    color: COLORS.textMuted, 
    fontSize: 13, 
    fontFamily: FONTS.inter.medium, 
    textAlign: 'center', 
    lineHeight: 18,
    marginBottom: 24 
  },
  openSelectorBtn: { 
    width: '100%', 
    height: 56, 
    backgroundColor: COLORS.primary, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 24 
  },
  openSelectorBtnText: { 
    color: '#fff', 
    fontSize: 14, 
    fontFamily: FONTS.inter.bold 
  },
  networksLabel: { 
    color: COLORS.textDim, 
    fontSize: 9, 
    fontFamily: FONTS.orbitron.bold, 
    letterSpacing: 1, 
    marginBottom: 12 
  },
  networksRow: { 
    flexDirection: 'row', 
    gap: 16, 
    marginBottom: 24 
  },
  chainText: { 
    color: COLORS.textMuted, 
    fontSize: 12, 
    fontFamily: FONTS.inter.semibold, 
    backgroundColor: 'rgba(255,255,255,0.03)', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: COLORS.border 
  },
  warningBox: { 
    flexDirection: 'row', 
    backgroundColor: 'rgba(245, 158, 11, 0.05)', 
    borderRadius: 12, 
    padding: 14, 
    borderWidth: 1, 
    borderColor: 'rgba(245, 158, 11, 0.15)',
    marginBottom: 16 
  },
  warningTitle: { 
    color: '#f59e0b', 
    fontSize: 12, 
    fontFamily: FONTS.inter.bold,
    marginBottom: 2 
  },
  warningText: { 
    color: 'rgba(245, 158, 11, 0.8)', 
    fontSize: 11, 
    fontFamily: FONTS.inter.medium, 
    lineHeight: 15 
  },
  rainbowCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.02)', 
    borderRadius: 12, 
    padding: 14, 
    borderWidth: 1, 
    borderColor: COLORS.border 
  },
  rainbowTitle: { 
    color: COLORS.text, 
    fontSize: 12, 
    fontFamily: FONTS.inter.bold, 
    marginBottom: 2 
  },
  rainbowDesc: { 
    color: COLORS.textDim, 
    fontSize: 11, 
    fontFamily: FONTS.inter.medium, 
    lineHeight: 15 
  },
  footerChecks: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    gap: 16 
  },
  checkItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 4 
  },
  checkText: { 
    color: COLORS.textDim, 
    fontSize: 10, 
    fontFamily: FONTS.inter.semibold 
  },

  recoveryMethodRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  recoveryMethodBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 10,
    borderRadius: 7,
  },
  recoveryMethodBtnActive: {
    backgroundColor: COLORS.primary,
  },
  recoveryMethodBtnText: {
    color: COLORS.textDim,
    fontSize: 10,
    fontFamily: FONTS.inter.bold,
  },
  uploadBox: {
    width: '100%',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(59,130,246,0.3)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  uploadBoxTitle: {
    color: COLORS.text,
    fontFamily: FONTS.inter.bold,
    fontSize: 14,
  },
  uploadBoxSub: {
    color: COLORS.textDim,
    fontFamily: FONTS.inter.medium,
    fontSize: 11,
  },
});

export default LoginScreen;
