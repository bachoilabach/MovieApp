import http from "@/config/axios";
import { DetailAccount, RequestToken, SessionId } from "@/models/user.model";
import { Status } from "@/hooks/useShowToast";
import { ValidateLogin, ValidateLoginParams } from "../models/user.model";
import { toastService } from "./toast.services";

export const getRequestToken = async (): Promise<RequestToken> => {
  try {
    const res = await http.get<any, RequestToken>("/authentication/token/new");
    return res;
  } catch (error) {
    toastService.showToast(Status.error, "Failed to get request token");
    throw error;
  }
};

export const validateLogin = async (
  args: ValidateLoginParams
): Promise<ValidateLogin> => {
  const res = await http.post<ValidateLoginParams, ValidateLogin>(
    "/authentication/token/validate_with_login",
    args
  );

  return res;
};

export const createSessionId = async (
  request_token: string
): Promise<SessionId> => {
  const res = await http.post<any, SessionId>("/authentication/session/new", {
    request_token,
  });
  return res;
};

export const getAccountDetail = async (
  sessionId: string
): Promise<DetailAccount> => {
  const res = await http.get<null, DetailAccount>("/account", {
    params: {
      session_id: sessionId,
    },
  });

  return res;
};
