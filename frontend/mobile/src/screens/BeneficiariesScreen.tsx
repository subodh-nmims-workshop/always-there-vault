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
import ApiService from '../services/ApiService';

type Beneficiary = {
  id: string;
  name: string;
  addedAt: number;
};

const BeneficiariesScreen = () => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  React.useEffect(() => {
    loadBeneficiaries();
  }, []);

  const loadBeneficiaries = async () => {
    try {
      const stored = await AsyncStorage.getItem('digital_will_beneficiaries');
      if (stored) {
        setBeneficiaries(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load beneficiaries', e);
    }
  };

  const saveBeneficiaries = async (newBeneficiaries: Beneficiary[]) => {
    try {
      await AsyncStorage.setItem('digital_will_beneficiaries', JSON.stringify(newBeneficiaries));
      setBeneficiaries(newBeneficiaries);

      // Sync heartbeat with backend on any management action
      await ApiService.getInstance().recordHeartbeat('Beneficiary Management action');
    } catch (e) {
      console.warn('Failed to save beneficiaries', e);
    }
  };

  const handleAddBeneficiary = () => {
    Alert.prompt(
      '👤 Add Beneficiary',
      'Enter the full name of the individual you wish to designate as a beneficiary of your digital assets.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Register',
          onPress: (text) => {
            if (!text) return;
            const newBeneficiary: Beneficiary = {
              id: Date.now().toString(),
              name: text,
              addedAt: Date.now(),
            };
            saveBeneficiaries([...beneficiaries, newBeneficiary]);
            Alert.alert(
              '🔒 Registry Updated',
              `${text} has been added to your secure beneficiary list. The protocol will notify them if the release trigger is activated.`,
              [{ text: 'Great', style: 'default' }]
            );
          }
        }
      ],
      'plain-text'
    );
  };

  const deleteBeneficiary = (id: string) => {
    Alert.alert(
      '⚠️ Remove Beneficiary',
      `Are you sure you want to remove ${beneficiaries.find(b => b.id === id)?.name || 'this person'}? They will no longer have cryptographic claims to your assets upon protocol trigger.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Revoke Access',
          style: 'destructive',
          onPress: () => {
            const filtered = beneficiaries.filter(b => b.id !== id);
            saveBeneficiaries(filtered);
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Beneficiaries</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddBeneficiary}>
          <Icon name="person-add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {beneficiaries.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="people-outline" size={64} color="#d1d5db" />
          <Text style={styles.emptyTitle}>No Beneficiaries Added</Text>
          <Text style={styles.emptySubtitle}>
            Add trusted people who will receive your digital assets
          </Text>
          <TouchableOpacity style={styles.addBeneficiaryButton} onPress={handleAddBeneficiary}>
            <Icon name="person-add" size={20} color="#ffffff" />
            <Text style={styles.addBeneficiaryText}>Add First Beneficiary</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.beneficiariesList}>
          {beneficiaries.map((beneficiary) => (
            <View key={beneficiary.id} style={styles.beneficiaryCard}>
              <View style={styles.beneficiaryAvatar}>
                <Text style={styles.beneficiaryAvatarText}>
                  {beneficiary.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.beneficiaryDetails}>
                <Text style={styles.beneficiaryName}>{beneficiary.name}</Text>
                <Text style={styles.beneficiaryDate}>
                  Added {new Date(beneficiary.addedAt).toLocaleDateString()}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteBeneficiary(beneficiary.id)} style={styles.deleteBtn}>
                <Icon name="person-remove" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
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
    backgroundColor: '#10b981',
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
  addBeneficiaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  addBeneficiaryText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
  beneficiariesList: {
    padding: 20,
  },
  beneficiaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  beneficiaryAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  beneficiaryAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
  },
  beneficiaryDetails: {
    flex: 1,
  },
  beneficiaryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  beneficiaryDate: {
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

export default BeneficiariesScreen;