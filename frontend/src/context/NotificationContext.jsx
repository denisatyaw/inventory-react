import React, { createContext, useContext, useState, useCallback } from 'react';
import NotificationContainer from '../components/ui/NotificationContainer';
import Notification from '../components/ui/Notification';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((type, message, duration = 5000) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message, duration }]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const value = {
    showNotification,
    success: (message, duration) => showNotification('success', message, duration),
    error: (message, duration) => showNotification('error', message, duration),
    warning: (message, duration) => showNotification('warning', message, duration),
    info: (message, duration) => showNotification('info', message, duration),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer>
        {notifications.map(({ id, type, message, duration }) => (
          <Notification
            key={id}
            type={type}
            message={message}
            duration={duration}
            onClose={() => removeNotification(id)}
          />
        ))}
      </NotificationContainer>
    </NotificationContext.Provider>
  );
};