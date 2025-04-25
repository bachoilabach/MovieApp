// selectors/authSelectors.ts
import { RootState } from "@/store/store";

export const selectAuth = (state: RootState) => state.auth;

export const selectUser = (state: RootState) => state.auth.user
export const selectSessionId = (state: RootState) => state.auth.sessionId;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
