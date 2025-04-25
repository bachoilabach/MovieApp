// useLogin.ts
import { useNavigation } from "@react-navigation/native";
import { set, useForm } from "react-hook-form";
import { useEffect } from "react";
import { toastService } from "../services/toast.services";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  getAccountDetail,
  getRequestToken,
  createSessionId,
  validateLogin,
} from "@/services/user.services";
import { Status } from "./useShowToast";
import {
  login,
  clearAuth,
  setRequestToken,
  setSession,
  setUser,
} from "@/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectSessionId, selectUser } from "@/store/Selector/authSelector";

type LoginForm = {
  username: string;
  password: string;
};

export function useLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const sessionId = useSelector(selectSessionId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async (loginForm: LoginForm) => {
    try {
      const res = await getRequestToken();
      const params = {
        username: loginForm.username,
        password: loginForm.password,
        request_token: res.request_token,
      };

      const validatedToken = await validateLogin(params);

      dispatch(setRequestToken(validatedToken.request_token));
      await AsyncStorage.setItem("request_token", validatedToken.request_token);
      const sessionRes = await createSessionId(validatedToken.request_token);
      dispatch(setSession(sessionRes.session_id));
      await AsyncStorage.setItem("session_id", sessionRes.session_id);
      const user = await getAccountDetail(sessionRes.session_id);
      dispatch(setUser(user));
      dispatch(login());

      toastService.showToast(Status.success, "Login success");
      navigation.goBack();
    } catch (err) {
      toastService.showToast(Status.error, "Invalid username or password");
    }
  };

  const handleResetFormLogin = () => {
    reset({
      username: "",
      password: "",
    });
  };

  useEffect(() => {
    return () => {
      handleResetFormLogin();
    };
  }, []);

  const handleLogout = async () => {
    dispatch(clearAuth());
  };

  return {
    control,
    handleLogin: handleSubmit(handleLogin),
    errors,
    user,
    sessionId,
    handleLogout,
  };
}
