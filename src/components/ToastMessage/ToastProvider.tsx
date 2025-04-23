// ToastProvider.tsx
import React, { useEffect } from 'react';
import { useShowToast } from '@/hooks/useShowToast';

import ToastMessage from './ToastMessage';
import { setToastRef } from '@/services/toast.services';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { showToast, top, opacity, status, message } = useShowToast();

  useEffect(() => {
    setToastRef({ showToast });
  }, [showToast]);

  return (
    <>
      {children}
      <ToastMessage top={top} opacity={opacity} status={status} message={message} />
    </>
  );
};
