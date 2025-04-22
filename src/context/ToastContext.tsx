import { Status, useShowToast } from '@/hooks/useShowToast';
import React, {
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { Animated } from 'react-native';

type ToastContextType = {
  showToast: (status: Status, message: string) => void;
  top: Animated.Value;
  opacity: Animated.Value;
  status: 'success' | 'error';
  message: string;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { showToast, top, opacity, status, message } = useShowToast();

  return (
    <ToastContext.Provider value={{ showToast, top, opacity, status, message }}>
      {children}
    </ToastContext.Provider>
  );
};
