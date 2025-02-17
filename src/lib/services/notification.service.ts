// Types
type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationMessage {
  type: NotificationType;
  message: string;
  duration?: number;
}

type NotificationCallback = (notification: NotificationMessage) => void;

// Service class
class NotificationService {
  private subscribers: ((notification: NotificationMessage) => void)[] = [];

  subscribe(callback: (notification: NotificationMessage) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  success(message: string, duration?: number) {
    this.notify('success', message, duration);
  }

  error(message: string, duration?: number) {
    this.notify('error', message, duration);
  }

  info(message: string, duration?: number) {
    this.notify('info', message, duration);
  }

  warning(message: string, duration?: number) {
    this.notify('warning', message, duration);
  }

  private notify(type: NotificationType, message: string, duration = 3000) {
    this.subscribers.forEach(subscriber => 
      subscriber({ type, message, duration })
    );
  }
}

// Single instance export
export const notificationService = new NotificationService();
