import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export enum Status {
  success = 'success',
  error = 'error',
}

const ToastMessage = () => {
  return <Toast />;
};

// Hàm tiện ích để hiển thị thông báo
export const showToast = (status: Status, message: string) => {
  console.log(status, message);
  Toast.show({
    type: status,
    text1: status === Status.success ? 'Success' : 'Error',
    text2: message,
    position: 'top',
  });
};

export default ToastMessage;

const styles = StyleSheet.create({});
