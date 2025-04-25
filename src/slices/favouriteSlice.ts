import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addFavouriteMovie,
  deleteFavouriteMovie,
  getFavouriteMoviees,
} from "@/services/movie.services";
import { Movie } from "@/models/movie.model";

interface FavouriteState {
  favourites: Movie[];
  isLoading: boolean;
  isFavourite: boolean;
}

const initialState: FavouriteState = {
  favourites: [],
  isLoading: false,
  isFavourite: false,
};

export const fetchFavouriteMovies = createAsyncThunk(
  "favourites/fetch",
  async ({
    accountId,
    sessionId,
  }: {
    accountId: number;
    sessionId: string;
  }) => {
    const response = await getFavouriteMoviees({ accountId, sessionId });
    return response.results;
  }
);

export const addToFavourite = createAsyncThunk(
  "favourites/add",
  async (
    {
      accountId,
      sessionId,
      mediaId,
    }: { accountId: number; sessionId: string; mediaId: number },
    { dispatch }
  ) => {
    await addFavouriteMovie({ accountId, sessionId, mediaId });
    dispatch(fetchFavouriteMovies({ accountId, sessionId }));
  }
);

export const removeFromFavourite = createAsyncThunk(
  "favourites/remove",
  async (
    {
      accountId,
      sessionId,
      mediaId,
    }: { accountId: number; sessionId: string; mediaId: number },
    { dispatch }
  ) => {
    await deleteFavouriteMovie(accountId, sessionId, mediaId);
    dispatch(fetchFavouriteMovies({ accountId, sessionId }));
  }
);

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavouriteMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavouriteMovies.fulfilled, (state, action) => {
        state.favourites = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavouriteMovies.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default favouriteSlice.reducer;
