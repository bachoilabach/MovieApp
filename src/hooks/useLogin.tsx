import { useAuth } from "@/context/AuthContext";
import { getRequestToken, getSessionId, validateLogin } from "@/services/user.services";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Status } from "./useShowToast";
import { useEffect } from "react";
import { showToast } from "@/services/toast.services";

type LoginForm = {
  username: string;
  password: string;
};
export function useLogin() {
  const { login } = useAuth();
  
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const handleLogin = async (loginForm: LoginForm) => {
    try {
      const token = await getRequestToken();
      const validatedToken = await validateLogin(
        loginForm.username,
        loginForm.password,
        token
      );
      const sessionId = await getSessionId(validatedToken);
      login(sessionId);
      showToast(Status.success, 'Login success');
      navigation.goBack();
    } catch (err: any) {
      showToast(Status.error, 'Invalid username or password');
    }
  };

  useEffect(() => {
    return () => {
      reset({
        username: '',
        password: '',
      });
    };
  }, []);
  return {
    control,
    handleLogin: handleSubmit(handleLogin),
    errors
  }
}
