import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [stats, setStats] = useState({
    totalAssets: 0,
    beneficiaries: 0,
    lastHeartbeat: new Date(),
    systemStatus: 'secure',
  });

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create-asset':
        navigation.navigate('Assets');
        break;
      case 'add-beneficiary':
        navigation.navigate('Beneficiaries');
        break;
      case 'heartbeat':
        navigation.navigate('Heartbeat');
        break;
      default:
        Alert.alert('Coming Soon', 'This feature is under development');
    }
  };

  const StatCard = ({ title, value, subtitle, icon, color }: any) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statContent}>
        <View style={styles.statText}>
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statTitle}>{title}</Text>
          {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
        </View>
        <Icon name={icon} size={24} color={color} />
      </View>
    </View>
  );

  const QuickActionButton = ({ title, icon, color, onPress }: any) => (
    <TouchableOpacity
      style={[styles.quickAction, { backgroundColor: color + '20' }]}
      onPress={onPress}
    >
      <Icon name={icon} size={24} color={color} />
      <Text style={[styles.quickActionText, { color }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.subtitle}>Your digital inheritance is secure</Text>
        </View>
        <View style={styles.securityBadge}>
          <Icon name="security" size={16} color="#10b981" />
          <Text style={styles.securityText}>Secure</Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        <StatCard
          title="Total Assets"
          value={stats.totalAssets}
          subtitle="No assets created yet"
          icon="folder"
          color="#3b82f6"
        />
        <StatCard
          title="Beneficiaries"
          value={stats.beneficiaries}
          subtitle="No beneficiaries added"
          icon="people"
          color="#10b981"
        />
        <StatCard
          title="Heartbeat Status"
          value="Active"
          subtitle={`Last: ${stats.lastHeartbeat.toLocaleDateString()}`}
          icon="favorite"
          color="#ef4444"
        />
        <StatCard
          title="System Status"
          value="Secure"
          subtitle="All systems operational"
          icon="check-circle"
          color="#8b5cf6"
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <QuickActionButton
            title="Create Asset"
            icon="add-circle"
            color="#3b82f6"
            onPress={() => handleQuickAction('create-asset')}
          />
          <QuickActionButton
            title="Add Beneficiary"
            icon="person-add"
            color="#10b981"
            onPress={() => handleQuickAction('add-beneficiary')}
          />
          <QuickActionButton
            title="Record Heartbeat"
            icon="favorite"
            color="#ef4444"
            onPress={() => handleQuickAction('heartbeat')}
          />
          <QuickActionButton
            title="View Settings"
            icon="settings"
            color="#6b7280"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
      </View>

      {/* Security Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Overview</Text>
        <View style={styles.securityCard}>
          <View style={styles.securityItem}>
            <Icon name="check-circle" size={20} color="#10b981" />
            <Text style={styles.securityItemText}>Client-side encryption enabled</Text>
          </View>
          <View style={styles.securityItem}>
            <Icon name="check-circle" size={20} color="#10b981" />
            <Text style={styles.securityItemText}>Shamir Secret Sharing active</Text>
          </View>
          <View style={styles.securityItem}>
            <Icon name="check-circle" size={20} color="#10b981" />
            <Text style={styles.securityItemText}>Decentralized storage ready</Text>
          </View>
          <View style={styles.securityItem}>
            <Icon name="check-circle" size={20} color="#10b981" />
            <Text style={styles.securityItemText}>Smart contracts deployed</Text>
          </View>
        </View>
      </View>

      {/* Architecture Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.architectureCard}>
          <Text style={styles.architectureText}>
            Your digital assets are encrypted client-side, keys are split using Shamir Secret Sharing,
            and stored across decentralized networks. Smart contracts automate the inheritance process
            when you're no longer active.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080a0f',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#05070a',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981' + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  securityText: {
    color: '#10b981',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 12,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  statContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statText: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    marginTop: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: (width - 60) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#1e293b',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  securityCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  securityItemText: {
    fontSize: 14,
    color: '#e2e8f0',
    marginLeft: 12,
  },
  architectureCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  architectureText: {
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 20,
  },
});

export default HomeScreen;