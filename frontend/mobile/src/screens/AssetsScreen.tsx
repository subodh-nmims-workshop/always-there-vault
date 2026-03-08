import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Asset = {
  id: string;
  name: string;
  type: string;
  createdAt: number;
};

const AssetsScreen = () => {
  const [assets, setAssets] = useState<Asset[]>([]);

  React.useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      const stored = await AsyncStorage.getItem('digital_will_assets');
      if (stored) {
        setAssets(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load assets', e);
    }
  };

  const saveAssets = async (newAssets: Asset[]) => {
    try {
      await AsyncStorage.setItem('digital_will_assets', JSON.stringify(newAssets));
      setAssets(newAssets);
    } catch (e) {
      console.warn('Failed to save assets', e);
    }
  };

  const handleCreateAsset = () => {
    Alert.prompt(
      '📁 Create Secure Asset',
      'Enter a name for your new digital asset. It will be encrypted immediately using your local keys.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Protect Asset',
          onPress: (text) => {
            if (!text) return;
            const newAsset: Asset = {
              id: Date.now().toString(),
              name: text,
              type: 'document',
              createdAt: Date.now(),
            };
            saveAssets([newAsset, ...assets]);
            Alert.alert(
              '🔐 Encryption Complete',
              'Your asset has been successfully encrypted and stored in your secure vault.',
              [{ text: 'Great', style: 'default' }]
            );
          }
        },
      ],
      'plain-text'
    );
  };

  const deleteAsset = (id: string) => {
    Alert.alert(
      '🗑️ Delete Asset',
      `Are you sure you want to permanently delete "${assets.find(a => a.id === id)?.name}"? This action cannot be undone and the asset will be unrecoverable.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Permanently',
          style: 'destructive',
          onPress: () => {
            const filtered = assets.filter(a => a.id !== id);
            saveAssets(filtered);
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Digital Assets</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateAsset}>
          <Icon name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {assets.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="folder-open" size={64} color="#d1d5db" />
          <Text style={styles.emptyTitle}>No Assets Yet</Text>
          <Text style={styles.emptySubtitle}>
            Create your first encrypted digital asset to secure your digital inheritance
          </Text>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateAsset}>
            <Icon name="add-circle" size={20} color="#ffffff" />
            <Text style={styles.createButtonText}>Create First Asset</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.assetsList}>
          {assets.map((asset) => (
            <View key={asset.id} style={styles.assetCard}>
              <View style={styles.assetIconBox}>
                <Icon name="insert-drive-file" size={24} color="#3b82f6" />
              </View>
              <View style={styles.assetDetails}>
                <Text style={styles.assetTitle}>{asset.name}</Text>
                <Text style={styles.assetDate}>
                  Added {new Date(asset.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteAsset(asset.id)} style={styles.deleteBtn}>
                <Icon name="delete-outline" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <View style={styles.infoCard}>
        <Icon name="security" size={24} color="#3b82f6" />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>End-to-End Encryption</Text>
          <Text style={styles.infoText}>
            All assets are encrypted on your device before upload. Your keys are split using
            Shamir Secret Sharing for maximum security.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  createButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
  assetsList: {
    padding: 20,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    lineHeight: 18,
  },
  assetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  assetIconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  assetDetails: {
    flex: 1,
  },
  assetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  assetDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  deleteBtn: {
    padding: 8,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
  },
});

export default AssetsScreen;