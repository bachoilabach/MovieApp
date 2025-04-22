import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import ToastMessage from './components/ToastMessage/ToastMessage';
import { View } from 'react-native';
import { useShowToast, Status } from './hooks/useShowToast';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  const toast = useShowToast();

  return (
    <>
      <Navigation
        linking={{
          enabled: 'auto',
          prefixes: [
            'helloworld://',
          ],
        }}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
      
      <ToastMessage
        top={toast.top}
        opacity={toast.opacity}
        status={toast.status}
        message={toast.message}
      />
    </>
  );
}
