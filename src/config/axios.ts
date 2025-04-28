// utils/http.ts (nơi bạn tạo axios instance)
import axios from "axios";
import { setSession, clearAuth } from "@/slices/authSlice";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "@/store/store";
import { createSessionId } from "@/services/user.services";
import { useNavigation } from "@react-navigation/native";

const http = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    if (!config.params) config.params = {};
    config.params["api_key"] = "beddc8c18b3b4508f644f72b198601e5";

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;

http.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const naviagtion = useNavigation();
    const status = error?.response?.status;
    const message = error?.response?.data?.status_message;

    if (status === 401 && message?.includes("expired session")) {
      if (isRefreshing) return Promise.reject(error);
      isRefreshing = true;
      try {
        const state = store.getState();
        console.log(state.auth)
        const requestToken = state.auth.requestToken;
        if (!requestToken) throw new Error("Missing request token");
        const { session_id } = await createSessionId(requestToken);
        store.dispatch(setSession(session_id));
        await AsyncStorage.setItem("sessionId", session_id);
        isRefreshing = false;
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Session expired",
          text2: "Please login again.",
        });
        store.dispatch(clearAuth());
        await AsyncStorage.multiRemove(["session_id", "request_token"]);
        naviagtion.navigate("Login");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default http;
