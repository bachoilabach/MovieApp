import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  username: string;
  name: string;
};

type AuthState = {
  requestToken: string | null;
  sessionId: string | null;
  user: User | {};
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  requestToken: null,
  sessionId: null,
  user: {},
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setSession(state, action: PayloadAction<string>) {
      state.sessionId = action.payload;
    },
    setRequestToken(state, action: PayloadAction<string>) {
      state.requestToken = action.payload;
    },
    clearAuth(state) {
      state.sessionId = null;
      state.requestToken = null;
    },
  },
});

export const { login, clearAuth, setSession, setUser, setRequestToken } =
  authSlice.actions;
export default authSlice.reducer;
