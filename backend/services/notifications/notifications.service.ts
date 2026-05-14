import { Injectable, Logger } from '@nestjs/common';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';

@Injectable()
export class NotificationsService {
  private expo: Expo;
  private readonly logger = new Logger(NotificationsService.name);

  constructor() {
    this.expo = new Expo();
  }

  /**
   * Send a push notification to a specific user
   */
  async sendPushNotification(pushToken: string, title: string, body: string, data?: any) {
    if (!Expo.isExpoPushToken(pushToken)) {
      this.logger.error(`Push token ${pushToken} is not a valid Expo push token`);
      return;
    }

    const messages: ExpoPushMessage[] = [{
      to: pushToken,
      sound: 'default',
      title,
      body,
      data,
      priority: 'high',
    }];

    try {
      const chunks = this.expo.chunkPushNotifications(messages);
      const tickets = [];
      
      for (const chunk of chunks) {
        const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      }

      this.logger.log(`Successfully sent notification to token: ${pushToken}`);
      return tickets;
    } catch (error) {
      this.logger.error(`Error sending push notification: ${error.message}`);
    }
  }

  /**
   * Send notification for heartbeat reminder
   */
  async sendHeartbeatReminder(pushToken: string, daysLeft: number) {
    const title = '🕒 Heartbeat Reminder';
    const body = daysLeft <= 1 
      ? '⚠️ CRITICAL: Your heartbeat is due within 24 hours. Please check in now to secure your legacy.'
      : `Friendly reminder: Your heartbeat is due in ${daysLeft} days.`;
    
    return this.sendPushNotification(pushToken, title, body, { type: 'HEARTBEAT_REMINDER' });
  }

  /**
   * Send notification for asset release trigger
   */
  async sendReleaseAlert(pushToken: string, beneficiaryName: string) {
    const title = '🛡️ Legacy Protected';
    const body = `Verification period has ended. Assets are being prepared for release to ${beneficiaryName}.`;
    
    return this.sendPushNotification(pushToken, title, body, { type: 'ASSET_RELEASE' });
  }
}
