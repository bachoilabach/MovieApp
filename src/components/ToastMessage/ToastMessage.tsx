import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { Status } from '@/hooks/useShowToast';
import { CheckIcon } from '@/assets/svgIcons';
import { Colors } from '@/constants/Colors';

type Props = {
  visible: boolean;
  message: string;
  status: Status;
};

const ToastMessage = ({ visible, message, status }: Props) => {
  const top = useRef(new Animated.Value(-50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(top, {
          toValue: 50,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(top, {
              toValue: -50,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start();
        }, 3000);
      });
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.container,
        { top, opacity },
        status === 'success' ? styles.success : styles.error,
      ]}
    >
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
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -150 }],
    width: 300,
    zIndex: 9999,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
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
    marginLeft: 8,
  },
});
