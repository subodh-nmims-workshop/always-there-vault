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

const BeneficiariesScreen = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);

  const handleAddBeneficiary = () => {
    Alert.alert('Demo Mode', 'Beneficiary management coming soon!');
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
          {/* Beneficiaries would be rendered here */}
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
});

export default BeneficiariesScreen;