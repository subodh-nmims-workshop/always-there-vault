import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = () => {
  const [biometricEnabled, setBiometricEnabled] = React.useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleSettingPress = (setting: string) => {
    Alert.alert('Demo Mode', `${setting} settings coming soon!`);
  };

  const SettingItem = ({ icon, title, subtitle, onPress, rightElement }: any) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Icon name={icon} size={24} color="#6b7280" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement || <Icon name="chevron-right" size={24} color="#d1d5db" />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon="fingerprint"
            title="Biometric Authentication"
            subtitle="Use fingerprint or face ID"
            onPress={() => {}}
            rightElement={
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                thumbColor={biometricEnabled ? '#ffffff' : '#f4f4f5'}
              />
            }
          />
          <SettingItem
            icon="security"
            title="Encryption Settings"
            subtitle="Manage encryption preferences"
            onPress={() => handleSettingPress('Encryption')}
          />
          <SettingItem
            icon="key"
            title="Key Management"
            subtitle="View and manage key shares"
            onPress={() => handleSettingPress('Key Management')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Heartbeat</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon="schedule"
            title="Heartbeat Interval"
            subtitle="Currently set to 30 days"
            onPress={() => handleSettingPress('Heartbeat Interval')}
          />
          <SettingItem
            icon="timer"
            title="Grace Period"
            subtitle="Currently set to 14 days"
            onPress={() => handleSettingPress('Grace Period')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon="notifications"
            title="Push Notifications"
            subtitle="Heartbeat reminders and alerts"
            onPress={() => {}}
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                thumbColor={notificationsEnabled ? '#ffffff' : '#f4f4f5'}
              />
            }
          />
          <SettingItem
            icon="email"
            title="Email Notifications"
            subtitle="Configure email alerts"
            onPress={() => handleSettingPress('Email Notifications')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Storage</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon="cloud"
            title="IPFS Settings"
            subtitle="Decentralized storage configuration"
            onPress={() => handleSettingPress('IPFS Settings')}
          />
          <SettingItem
            icon="storage"
            title="Arweave Settings"
            subtitle="Permanent storage configuration"
            onPress={() => handleSettingPress('Arweave Settings')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon="info"
            title="App Version"
            subtitle="1.0.0 (Demo)"
            onPress={() => {}}
          />
          <SettingItem
            icon="help"
            title="Help & Support"
            subtitle="Get help with the app"
            onPress={() => handleSettingPress('Help & Support')}
          />
          <SettingItem
            icon="privacy-tip"
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            onPress={() => handleSettingPress('Privacy Policy')}
          />
        </View>
      </View>

      <View style={styles.dangerSection}>
        <Text style={styles.sectionTitle}>Danger Zone</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon="warning"
            title="Emergency Override"
            subtitle="Stop all asset releases immediately"
            onPress={() => Alert.alert(
              'Emergency Override',
              'This will immediately stop all asset releases. Are you sure?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Activate Override', style: 'destructive', onPress: () => Alert.alert('Demo', 'Emergency override activated (Demo mode)') },
              ]
            )}
          />
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  dangerSection: {
    marginBottom: 40,
  },
});

export default SettingsScreen;