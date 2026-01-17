import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HeartbeatScreen = () => {
  const [lastHeartbeat, setLastHeartbeat] = useState(new Date());
  const [isRecording, setIsRecording] = useState(false);
  const [heartbeatAnimation] = useState(new Animated.Value(1));

  const animateHeartbeat = () => {
    Animated.sequence([
      Animated.timing(heartbeatAnimation, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(heartbeatAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(heartbeatAnimation, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(heartbeatAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleHeartbeat = async () => {
    setIsRecording(true);
    animateHeartbeat();
    
    // Simulate heartbeat recording
    setTimeout(() => {
      setLastHeartbeat(new Date());
      setIsRecording(false);
      Alert.alert('Success', 'Heartbeat recorded successfully!');
    }, 1000);
  };

  const nextHeartbeatDate = new Date(lastHeartbeat.getTime() + 30 * 24 * 60 * 60 * 1000);

  return (
    <View style={styles.container}>
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Icon name="favorite" size={24} color="#ef4444" />
          <Text style={styles.statusTitle}>Heartbeat Status</Text>
        </View>
        <Text style={styles.statusValue}>Active</Text>
        <Text style={styles.statusSubtitle}>System is monitoring your activity</Text>
      </View>

      <View style={styles.heartbeatContainer}>
        <Animated.View 
          style={[
            styles.heartbeatButton,
            { transform: [{ scale: heartbeatAnimation }] }
          ]}
        >
          <TouchableOpacity
            style={styles.heartbeatTouchable}
            onPress={handleHeartbeat}
            disabled={isRecording}
          >
            <Icon 
              name="favorite" 
              size={80} 
              color={isRecording ? "#fca5a5" : "#ef4444"} 
            />
          </TouchableOpacity>
        </Animated.View>
        
        <Text style={styles.heartbeatLabel}>
          {isRecording ? 'Recording...' : 'Tap to Record Heartbeat'}
        </Text>
      </View>

      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <Text style={styles.infoValue}>30 Days</Text>
          <Text style={styles.infoLabel}>Interval</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoValue}>14 Days</Text>
          <Text style={styles.infoLabel}>Grace Period</Text>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Last Heartbeat</Text>
          <Text style={styles.detailValue}>{lastHeartbeat.toLocaleDateString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Next Required</Text>
          <Text style={styles.detailValue}>{nextHeartbeatDate.toLocaleDateString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status</Text>
          <View style={styles.statusBadge}>
            <Icon name="check-circle" size={16} color="#10b981" />
            <Text style={styles.statusBadgeText}>On Time</Text>
          </View>
        </View>
      </View>

      <View style={styles.helpCard}>
        <Icon name="info" size={20} color="#3b82f6" />
        <Text style={styles.helpText}>
          Regular heartbeats prove you're still active. If you miss heartbeats beyond the grace period, 
          your digital assets will be released to beneficiaries according to your rules.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  statusCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8,
  },
  statusValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 5,
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  heartbeatContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  heartbeatButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 20,
  },
  heartbeatTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
  },
  heartbeatLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flex: 0.48,
  },
  infoValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981' + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
    marginLeft: 4,
  },
  helpCard: {
    flexDirection: 'row',
    backgroundColor: '#3b82f6' + '10',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
  },
  helpText: {
    fontSize: 14,
    color: '#1e40af',
    marginLeft: 12,
    lineHeight: 18,
    flex: 1,
  },
});

export default HeartbeatScreen;