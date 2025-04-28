export interface DetailAccount {
  id: number;
  username: string;
  name: string;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
}

export type DetailAccountParams = {
  session_id: string;
}

export interface RequestToken {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface ValidateLoginParams {
  username: string;
  password: string;
  request_token: string;
}

export interface ValidateLogin {
  success: boolean;
  expires_at: string;
  request_token: string;
}
export interface SessionId {
  success: boolean;
  session_id: string;
}
