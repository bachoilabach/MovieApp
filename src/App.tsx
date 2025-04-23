import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import ToastMessage from './components/ToastMessage/ToastMessage';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/ToastMessage/ToastProvider';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Navigation
          linking={{
            enabled: 'auto',
            prefixes: ['helloworld://'],
          }}
          onReady={() => {
            SplashScreen.hideAsync();
          }}
        />
      </AuthProvider>
    </ToastProvider>
  );
}
