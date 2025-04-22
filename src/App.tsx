import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import ToastMessage from './components/ToastMessage/ToastMessage';
import { View } from 'react-native';
import { useShowToast, Status } from './hooks/useShowToast';
import { ToastProvider } from './context/ToastContext';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <ToastProvider >
      <Navigation
        linking={{
          enabled: 'auto',
          prefixes: ['helloworld://'],
        }}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
      <ToastMessage />
    </ToastProvider>
  );
}
