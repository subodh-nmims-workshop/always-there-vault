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

const AssetsScreen = () => {
  const [assets, setAssets] = useState([]);

  const handleCreateAsset = () => {
    Alert.alert(
      'Create Asset',
      'Choose asset type:',
      [
        { text: 'Crypto Keys', onPress: () => Alert.alert('Demo', 'Crypto keys asset creation (Demo mode)') },
        { text: 'Audio Message', onPress: () => Alert.alert('Demo', 'Audio message creation (Demo mode)') },
        { text: 'Document', onPress: () => Alert.alert('Demo', 'Document upload (Demo mode)') },
        { text: 'Cancel', style: 'cancel' },
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
          {/* Assets would be rendered here */}
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
});

export default AssetsScreen;