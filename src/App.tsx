import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Navigation } from "./navigation";
import { ToastProvider } from "./components/ToastMessage/ToastProvider";
import { Provider, useDispatch } from "react-redux";
import { persistor, store } from "./store/store";
import { setRequestToken, setSession } from "./slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistGate } from "redux-persist/integration/react";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <Navigation
            linking={{
              enabled: "auto",
              prefixes: ["helloworld://"],
            }}
            onReady={() => {
              SplashScreen.hideAsync();
            }}
          />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}
