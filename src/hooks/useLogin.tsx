// useLogin.ts
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toastService } from "../services/toast.services";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/config/store";
import {
  getAccountDetail,
  getRequestToken,
  getSessionId,
  validateLogin,
} from "@/services/user.services";
import { Status } from "./useShowToast";
import { login, logout } from "@/slices/authSlice";

type LoginForm = {
  username: string;
  password: string;
};

export function useLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

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
      console.log(res)
      const params = {
        username: loginForm.username,
        password: loginForm.password,
        request_token: res.request_token,
      };
      const validatedToken = await validateLogin(params);
      const sessionRes = await getSessionId(validatedToken.request_token);
      const user = await getAccountDetail(sessionRes.session_id);
      dispatch(
        login({
          sessionId: sessionRes.session_id,
          user: {
            id: user.id,
            username: user.username,
            name: user.name,
          },
        })
      );

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

  const user = useSelector((state: any) => state.auth.user);
  const sessionId = useSelector((state: any) => state.auth.sessionId);

  const handleLogout = async () => {
    dispatch(logout());
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
