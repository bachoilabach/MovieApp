import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMovie } from "@/services/movie.services";
import { Movie } from "@/models/movie.model";

interface MovieState {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
}

const initialState: MovieState = {
  movies: [],
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  isRefreshing: false,
  isLoadingMore: false,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchAll",
  async (page: number) => {
    const response = await getAllMovie(page);
    return response;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    refresh: (state, action) => {
      state.isRefreshing = action.payload;
    },
    loadingMore: (state, action) => {
      state.isLoadingMore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (action.payload.page === 1) {
          state.movies = action.payload.results;
        } else {
          state.movies = [...state.movies, ...action.payload.results];
        }
        state.totalPages = action.payload.total_pages;
        state.currentPage = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { refresh, loadingMore } = movieSlice.actions;
export default movieSlice.reducer;
