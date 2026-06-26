import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Plus, 
  Search, 
  FileText, 
  Key, 
  HardDrive,
  Cpu,
  MoreVertical,
  ChevronRight,
  Folder,
  Image as ImageIcon,
  CreditCard,
  Briefcase,
  Lock,
  ArrowUpRight,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardHeader from '../components/DashboardHeader';
import ProtocolModal from '../components/ProtocolModal';
import { COLORS, FONTS, RADIUS, GAPS } from '../theme';

const { width } = Dimensions.get('window');

type AssetCategory = 'bank_account' | 'self_custody_crypto' | 'exchange_account' | 'crypto_keys' | 'business_secret' | 'document' | 'photo' | 'video';

interface CategoryTemplate {
  id: AssetCategory;
  label: string;
  icon: any;
  color: string;
  fields: { name: string; label: string; type: string; placeholder: string; required: boolean; encrypted: boolean; options?: string[] }[];
}

const CATEGORY_TEMPLATES: Record<AssetCategory, CategoryTemplate> = {
  bank_account: {
    id: 'bank_account',
    label: 'Bank / Finance',
    icon: CreditCard,
    color: '#10b981',
    fields: [
      { name: 'accountName', label: 'Account Name', type: 'text', placeholder: 'e.g., HDFC Savings', required: true, encrypted: false },
      { name: 'bankName', label: 'Bank Name', type: 'text', placeholder: 'e.g., HDFC Bank', required: true, encrypted: false },
      { name: 'accountNumber', label: 'Account Number', type: 'password', placeholder: 'Account Number', required: true, encrypted: true },
      { name: 'accountType', label: 'Type', type: 'select', placeholder: 'Select type', required: true, encrypted: false, options: ['Savings', 'Current', 'Fixed Deposit', 'Credit Card'] },
    ]
  },
  self_custody_crypto: {
    id: 'self_custody_crypto',
    label: 'Crypto Wallets',
    icon: Key,
    color: '#f59e0b',
    fields: [
      { name: 'walletName', label: 'Wallet Name', type: 'text', placeholder: 'e.g., My MetaMask', required: true, encrypted: false },
      { name: 'walletType', label: 'Wallet Type', type: 'select', placeholder: 'Select type', required: true, encrypted: false, options: ['MetaMask', 'Ledger', 'Trust Wallet', 'Trezor'] },
      { name: 'seedPhrase', label: 'Seed Phrase', type: 'textarea', placeholder: '12 or 24 words...', required: true, encrypted: true },
      { name: 'walletAddress', label: 'Public Address', type: 'text', placeholder: '0x...', required: false, encrypted: false },
    ]
  },
  exchange_account: {
    id: 'exchange_account',
    label: 'Exchanges',
    icon: Briefcase,
    color: '#06b6d4',
    fields: [
      { name: 'exchangeName', label: 'Exchange', type: 'select', placeholder: 'Select exchange', required: true, encrypted: false, options: ['Binance', 'Coinbase', 'Kraken'] },
      { name: 'accountEmail', label: 'Email', type: 'text', placeholder: 'your@email.com', required: true, encrypted: false },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Login password', required: true, encrypted: true },
      { name: 'twoFactor', label: '2FA Backup', type: 'textarea', placeholder: 'Backup codes', required: false, encrypted: true },
    ]
  },
  crypto_keys: {
    id: 'crypto_keys',
    label: 'Raw Keys',
    icon: Cpu,
    color: '#a855f7',
    fields: [
      { name: 'keyName', label: 'Label', type: 'text', placeholder: 'e.g., BTC Main Key', required: true, encrypted: false },
      { name: 'keyValue', label: 'Key/Value', type: 'textarea', placeholder: 'Paste raw key here', required: true, encrypted: true },
    ]
  },
  business_secret: {
    id: 'business_secret',
    label: 'Secrets',
    icon: Lock,
    color: '#94a3b8',
    fields: [
      { name: 'secretName', label: 'Name', type: 'text', placeholder: 'e.g., AWS Secret', required: true, encrypted: false },
      { name: 'secretValue', label: 'Value', type: 'textarea', placeholder: 'Secret content', required: true, encrypted: true },
    ]
  },
  document: {
    id: 'document',
    label: 'Docs',
    icon: FileText,
    color: '#3b82f6',
    fields: [
      { name: 'docName', label: 'Document Name', type: 'text', placeholder: 'e.g., Passport', required: true, encrypted: false },
      { name: 'docNumber', label: 'ID Number', type: 'text', placeholder: 'ID/Num', required: false, encrypted: false },
    ]
  },
  photo: {
    id: 'photo',
    label: 'Photos',
    icon: ImageIcon,
    color: '#f97316',
    fields: [
      { name: 'photoName', label: 'Title', type: 'text', placeholder: 'e.g., Family Archive', required: true, encrypted: false },
    ]
  },
  video: {
    id: 'video',
    label: 'Video',
    icon: ImageIcon,
    color: '#ec4899',
    fields: [
      { name: 'videoName', label: 'Title', type: 'text', placeholder: 'e.g., Message to Kids', required: true, encrypted: false },
    ]
  },
};

const CATEGORIES: { label: string; icon: any; id: AssetCategory }[] = [
  { id: 'document', label: 'Docs', icon: FileText },
  { id: 'photo', label: 'Photos', icon: ImageIcon },
  { id: 'bank_account', label: 'Bank', icon: CreditCard },
  { id: 'self_custody_crypto', label: 'Crypto', icon: Key },
  { id: 'business_secret', label: 'Secrets', icon: Lock },
];

const AssetsScreen = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | 'all'>('all');
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [wallet, setWallet] = useState('0x...');

  useEffect(() => {
    loadItems();
    loadWallet();
  }, []);

  const loadWallet = async () => {
    const w = await AsyncStorage.getItem('dwp_wallet_address');
    if (w) setWallet(w);
  };

  const loadItems = async () => {
    const saved = await AsyncStorage.getItem('dwp_vault_items');
    if (saved) setItems(JSON.parse(saved));
  };

  const handleCreate = async () => {
    const activeTmpl = CATEGORY_TEMPLATES[selectedCategory === 'all' ? 'document' : selectedCategory];
    const assetName = formData[activeTmpl.fields[0].name] || 'Unnamed Asset';
    
    setIsEncrypting(true);
    
    setTimeout(async () => {
      let structured = `=== ${activeTmpl.label.toUpperCase()} ===\n\n`;
      activeTmpl.fields.forEach(f => {
        if (formData[f.name]) {
          structured += `${f.encrypted ? '🔒 ' : ''}${f.label}: ${formData[f.name]}\n`;
        }
      });

      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: assetName,
        type: activeTmpl.id,
        category: activeTmpl.id,
        createdAt: new Date().toISOString(),
        size: (structured.length / 1024).toFixed(1) + ' KB'
      };
      
      const updated = [...items, newItem];
      setItems(updated);
      await AsyncStorage.setItem('dwp_vault_items', JSON.stringify(updated));
      
      setIsEncrypting(false);
      setShowAdd(false);
      setFormData({});
    }, 2000);
  };

  const deleteItem = async (id: string) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    await AsyncStorage.setItem('dwp_vault_items', JSON.stringify(updated));
  };

  const getIcon = (type: string) => {
    const tmpl = CATEGORY_TEMPLATES[type as AssetCategory];
    if (tmpl) return <tmpl.icon size={18} color={tmpl.color} />;
    return <FileText size={18} color={COLORS.primary} />;
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <DashboardHeader walletAddress={wallet} />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
           <Text style={styles.tabTitle}>ASSETS</Text>
           <TouchableOpacity style={styles.newButton} onPress={() => setShowAdd(true)}>
              <Plus size={16} color="#fff" />
              <Text style={styles.newButtonText}>New Item</Text>
           </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
           <TouchableOpacity 
             style={[styles.catChip, selectedCategory === 'all' && styles.catChipActive]}
             onPress={() => setSelectedCategory('all')}
           >
             <Folder size={18} color={selectedCategory === 'all' ? '#fff' : COLORS.textDim} />
             <Text style={[styles.catChipText, selectedCategory === 'all' && styles.catChipTextActive]}>All Files</Text>
           </TouchableOpacity>
           {CATEGORIES.map((cat) => (
             <TouchableOpacity 
               key={cat.id} 
               style={[styles.catChip, selectedCategory === cat.id && styles.catChipActive]}
               onPress={() => setSelectedCategory(cat.id)}
             >
               <cat.icon size={18} color={selectedCategory === cat.id ? '#fff' : COLORS.textDim} />
               <Text style={[styles.catChipText, selectedCategory === cat.id && styles.catChipTextActive]}>
                 {cat.label}
               </Text>
             </TouchableOpacity>
           ))}
        </ScrollView>

        <View style={styles.driveCard}>
           <View style={styles.driveHeader}>
              <View>
                 <Text style={styles.driveTitle}>Vault Drive</Text>
                 <Text style={styles.driveSub}>AlwaysThere VAULT</Text>
              </View>
              <TouchableOpacity style={styles.searchBtn}>
                 <Search size={20} color={COLORS.textDim} />
              </TouchableOpacity>
           </View>

           <View style={styles.breadcrumb}>
              <Folder size={12} color={COLORS.textDim} />
              <Text style={styles.breadcrumbText}>Vault Drive</Text>
              <ChevronRight size={12} color={COLORS.textDim} />
              <Text style={styles.breadcrumbActive}>{selectedCategory === 'all' ? 'All Files' : CATEGORY_TEMPLATES[selectedCategory].label}</Text>
           </View>
        </View>

        <Text style={styles.listHeader}>DIRECTORY CONTENTS</Text>
        
        {items.length === 0 ? (
          <View style={styles.emptyState}>
             <View style={styles.emptyIconBox}>
                <HardDrive size={48} color={COLORS.surfaceLight} />
             </View>
             <Text style={styles.emptyTitle}>No assets secured yet</Text>
             <Text style={styles.emptyText}>Items you encrypt will appear here sharded across the protocol nodes.</Text>
          </View>
        ) : (
          <View style={styles.assetList}>
             {items.filter(i => selectedCategory === 'all' || i.category === selectedCategory).map((item) => (
               <View key={item.id} style={styles.assetItem}>
                  <View style={styles.assetLeading}>
                     <View style={[styles.assetIconBox, { backgroundColor: (CATEGORY_TEMPLATES[item.type as AssetCategory]?.color || COLORS.primary) + '15' }]}>
                        {getIcon(item.type)}
                     </View>
                     <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                           <Text style={styles.assetTitle}>{item.name}</Text>
                           <View style={[styles.typeBadge, { borderColor: CATEGORY_TEMPLATES[item.type as AssetCategory]?.color || COLORS.primary }]}>
                              <Text style={[styles.typeBadgeText, { borderColor: CATEGORY_TEMPLATES[item.type as AssetCategory]?.color || COLORS.primary }]}>
                                {CATEGORY_TEMPLATES[item.type as AssetCategory]?.label.toUpperCase()}
                              </Text>
                           </View>
                        </View>
                        <Text style={styles.assetSub}>{item.size} • {new Date(item.createdAt).toLocaleDateString()}</Text>
                     </View>
                  </View>
                  <TouchableOpacity onPress={() => deleteItem(item.id)}>
                    <MoreVertical size={16} color={COLORS.textDim} />
                  </TouchableOpacity>
               </View>
             ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      <ProtocolModal visible={showAdd} onClose={() => setShowAdd(false)} title="SECURE NEW PAYLOAD">
         {isEncrypting ? (
           <View style={styles.encrypting}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.encTitle}>SHARDING PAYLOAD...</Text>
              <Text style={styles.encSub}>Distributing shares to 5/5 Quorum Nodes</Text>
           </View>
         ) : (
           <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 500 }}>
              <Text style={styles.modalSub}>Encrypting for Vault: {selectedCategory === 'all' ? 'document' : selectedCategory}</Text>
              
              {CATEGORY_TEMPLATES[selectedCategory === 'all' ? 'document' : selectedCategory].fields.map(field => (
                <View key={field.name} style={{ marginBottom: 16 }}>
                  <Text style={styles.inputLabel}>{field.label.toUpperCase()} {field.encrypted && '(ENCRYPTED)'}</Text>
                  <TextInput
                    style={[styles.input, field.type === 'textarea' && styles.textArea]}
                    placeholder={field.placeholder}
                    placeholderTextColor={COLORS.textDim}
                    secureTextEntry={field.type === 'password'}
                    multiline={field.type === 'textarea'}
                    numberOfLines={field.type === 'textarea' ? 4 : 1}
                    value={formData[field.name] || ''}
                    onChangeText={(val) => setFormData(prev => ({ ...prev, [field.name]: val }))}
                  />
                </View>
              ))}

              <Text style={styles.inputLabel}>ATAL SUPPORTING DOCS</Text>
              <TouchableOpacity style={styles.uploadBox}>
                 <Cpu size={24} color={COLORS.primary} />
                 <Text style={styles.uploadText}>Link Digital Fingerprint (PDF, JPG)</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleCreate}>
                 <Text style={styles.primaryBtnText}>INITIATE ENCRYPTION</Text>
                 <ArrowUpRight size={18} color="#fff" />
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
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: GAPS.lg, marginBottom: 12 },
  tabTitle: { color: COLORS.textDim, fontFamily: FONTS.orbitron.bold, fontSize: 10, letterSpacing: 2 },
  newButton: { 
    backgroundColor: COLORS.primary, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 8 
  },
  newButtonText: { color: '#fff', fontSize: 12, fontFamily: FONTS.inter.bold },
  categoryBar: { paddingLeft: GAPS.lg, marginBottom: 20 },
  catChip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 24, 
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface
  },
  catChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catChipText: { color: COLORS.textDim, fontSize: 12, fontFamily: FONTS.inter.bold },
  catChipTextActive: { color: '#fff' },
  driveCard: { paddingHorizontal: GAPS.lg, marginBottom: 24 },
  driveHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  driveTitle: { color: COLORS.text, fontSize: 28, fontFamily: FONTS.orbitron.black },
  driveSub: { color: COLORS.primary, fontSize: 10, fontFamily: FONTS.orbitron.bold, marginTop: 2 },
  searchBtn: { width: 44, height: 44, backgroundColor: COLORS.surface, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border },
  breadcrumb: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: COLORS.surface, padding: 12, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.border },
  breadcrumbText: { color: COLORS.textDim, fontSize: 11, fontFamily: FONTS.inter.bold },
  breadcrumbActive: { color: COLORS.text, fontSize: 11, fontFamily: FONTS.inter.bold },
  listHeader: { color: COLORS.textDim, fontSize: 11, fontFamily: FONTS.orbitron.bold, letterSpacing: 1, marginLeft: GAPS.lg, marginBottom: 16 },
  assetList: { paddingHorizontal: GAPS.lg, gap: 12 },
  assetItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: COLORS.surface, 
    padding: 18, 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  assetLeading: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  assetIconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  assetTitle: { color: COLORS.text, fontSize: 15, fontFamily: FONTS.inter.bold },
  assetSub: { color: COLORS.textDim, fontSize: 11, fontFamily: FONTS.inter.medium, marginTop: 4 },
  emptyState: { alignItems: 'center', marginTop: 60, paddingHorizontal: 40 },
  emptyIconBox: { width: 100, height: 100, borderRadius: 30, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  emptyTitle: { color: COLORS.textMuted, fontSize: 18, fontFamily: FONTS.inter.bold, textAlign: 'center' },
  emptyText: { color: COLORS.textDim, fontSize: 14, fontFamily: FONTS.inter.medium, textAlign: 'center', marginTop: 10, lineHeight: 22 },
  inputLabel: { color: COLORS.textDim, fontSize: 10, fontFamily: FONTS.orbitron.bold, marginBottom: 10, marginTop: 4 },
  input: { backgroundColor: COLORS.background, height: 56, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, color: '#fff', paddingHorizontal: 16, fontFamily: FONTS.inter.medium, fontSize: 14 },
  textArea: { height: 120, paddingTop: 16, paddingBottom: 16, textAlignVertical: 'top' },
  uploadBox: { borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, borderStyle: 'dashed', height: 90, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.background, gap: 10, marginTop: 4, marginBottom: 24 },
  uploadText: { color: COLORS.textMuted, fontSize: 12, fontFamily: FONTS.inter.medium },
  primaryBtn: { backgroundColor: COLORS.primary, height: 60, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 10 },
  primaryBtnText: { color: '#fff', fontSize: 15, fontFamily: FONTS.orbitron.black, letterSpacing: 1 },
  encrypting: { alignItems: 'center', paddingVertical: 40 },
  encTitle: { color: COLORS.text, fontSize: 18, fontFamily: FONTS.orbitron.black, marginTop: 24 },
  encSub: { color: COLORS.textDim, fontSize: 14, fontFamily: FONTS.inter.medium, marginTop: 10 },
  modalSub: { color: COLORS.primary, fontSize: 11, fontFamily: FONTS.orbitron.bold, marginBottom: 24, textTransform: 'uppercase', letterSpacing: 1 },
  typeBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.1)' },
  typeBadgeText: { fontSize: 8, fontFamily: FONTS.orbitron.bold },
});

export default AssetsScreen;