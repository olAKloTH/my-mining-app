'use client';
import { createContext, useContext, useState } from 'react';
import Announcement from '../ui/Announcement';

const NotificationContext = createContext<any>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const triggerNotify = (msg: string) => {
    setMessage(msg);
    setIsOpen(true);
  };

  return (
    <NotificationContext.Provider value={{ triggerNotify }}>
      {children}
      <Announcement isOpen={isOpen} message={message} onClose={() => setIsOpen(false)} />
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);