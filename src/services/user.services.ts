import http from '@/config/axios';

export const getRequestToken = async () => {
  try {
    const res = await http.get(`/authentication/token/new`);
    return res.data.request_token;
  } catch (error) {}
};

export const validateLogin = async (
  username: string,
  password: string,
  requestToken: string
) => {
  const res = await http.post(`/authentication/token/validate_with_login`, {
    username,
    password,
    request_token: requestToken,
  });

  const data = res.data;
  if (!data.success) {
    
  }

  return res.data.request_token;
};

export const getSessionId = async (request_token: string) => {
  const res = await http.post(`/authentication/session/new`, {
    request_token: request_token,
  });
  const data = res.data;
  if (!data.success) {
    throw new Error(data.status_message || 'Failed to create session');
  }

  return res.data.session_id;
};

export const getAccountDetail = async (sessionId: string) => {
  const res = await http.get('/account', {
    params: { session_id: sessionId },
  });
  return res.data;
};