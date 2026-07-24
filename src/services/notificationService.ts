import { api } from '../api';
import { Notification } from '../types';

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    return api.getNotifications();
  },

  async markRead(id: string) {
    return api.markNotificationRead(id);
  },

  async markAllRead() {
    return api.markAllNotificationsRead();
  },
};
