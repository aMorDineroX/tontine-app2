import React, { useEffect, useState } from 'react';
import { notificationService } from '../../lib/services/notification.service';

interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export const Notification: React.FC<NotificationProps> = ({ type, message }) => {
  return (
    <div 
      className={`p-4 rounded-md shadow-lg ${
        type === 'error' ? 'bg-red-500' :
        type === 'success' ? 'bg-green-500' :
        type === 'warning' ? 'bg-yellow-500' :
        'bg-blue-500'
      } text-white`}
    >
      {message}
    </div>
  );
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [notifications, setNotifications] = useState<Array<{
    id: number;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  }>>([]);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe(({ type, message }) => {
      const id = Date.now();
      setNotifications(prev => [...prev, { id, type, message }]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 3000);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {notifications.map(({ id, type, message }) => (
          <Notification key={id} type={type} message={message} />
        ))}
      </div>
    </>
  );
};
