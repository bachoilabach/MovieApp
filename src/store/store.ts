// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logger from "redux-logger";

import authSlice from "@/slices/authSlice";
import favouriteSlice from "@/slices/favouriteSlice";
import movieDetailSlice from "@/slices/movieDetailSlice";
import movieSlice from "@/slices/movieSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  movies: movieSlice,
  favourites: favouriteSlice,
  movieDetail: movieDetailSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: __DEV__, 
});


export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
