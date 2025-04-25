import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  username: string;
  name: string;
};

type AuthState = {
  sessionId: string | null;
  user: User | null;
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  sessionId: null,
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ sessionId: string; user: User }>) => {
      state.sessionId = action.payload.sessionId;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.sessionId = null;
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
