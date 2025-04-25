// store.ts
import authSlice from "@/slices/authSlice";
import favouriteSlice from "@/slices/favouriteSlice";
import movieSlice from "@/slices/movieSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    movies: movieSlice,
    favourites: favouriteSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
