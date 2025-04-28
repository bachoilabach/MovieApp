import { useRef, useState } from 'react';
import { Alert, Animated } from 'react-native';

export enum Status {
  success = 'success',
  error = 'error',
}

export const useShowToast = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>(Status.success);
  const [visible, setVisible] = useState(false);

  const showToast = (status: Status, msg: string) => {
    setStatus(status);
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 3500);
  };

  return {
    visible,
    message,
    status,
    showToast,
  };
};

