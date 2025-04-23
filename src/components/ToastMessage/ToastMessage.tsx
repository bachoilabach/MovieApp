import { Alert, Animated, StyleSheet, Text } from 'react-native';
import React from 'react';
import { CheckIcon } from '@/assets/svgIcons';
import { Colors } from '@/constants/Colors';
import { Status } from '@/hooks/useShowToast';
type ToastMessage = {
  top: number;
  opacity: number;
  status: Status;
  message: string;
};
const ToastMessage = ({ top, opacity, status, message }: ToastMessage) => {
  return (
    <Animated.View
      tabIndex={0}
      style={[
        styles.container,
        { top, opacity },
        status === 'success' ? styles.success : styles.error,
      ]}>
      <CheckIcon />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    paddingVertical: 10,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -150 }],
    width: 300,
    zIndex: 9999,
    borderRadius: 8,
  },
  success: {
    backgroundColor: Colors.toast.success,
  },
  error: {
    backgroundColor: Colors.toast.error,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
