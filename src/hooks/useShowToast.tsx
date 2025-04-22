import { useRef, useState } from "react";
import { Animated } from "react-native";

export enum Status {
  success = "success",
  error = "error",
}

export const useShowToast = () => {
  const top = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [message, setMessage] = useState<string>(""); 
  const [status, setStatus] = useState<Status>(Status.success); 

  const showToast = (status: Status, message: string) => {
    setStatus(status); 
    setMessage(message);
    Animated.parallel([
      Animated.timing(top, {
        toValue: 20, 
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1, 
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setTimeout(() => hideToast(), 3000); 
    });
  };

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(top, {
        toValue: -100,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0, 
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return {
    top,
    opacity,
    message,
    status,
    showToast,
  };
};
