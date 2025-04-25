import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllMovie,
  getMovieById,
  getMovieVideos,
  MovieVideo,
} from "@/services/movie.services";
import { Movie, MovieDetail } from "@/models/movie.model";

interface MovieState {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
  detail: MovieDetail | null;
  videos: MovieVideo[];
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
}

const initialState: MovieState = {
  movies: [],
  totalPages: 0,
  currentPage: 1,
  detail: null,
  videos: [],
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

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchDetail",
  async (id: number) => {
    const response = await getMovieById(id);
    return response;
  }
);

export const fetchMovieVideos = createAsyncThunk(
  "movies/fetchVideos",
  async (id: number) => {
    const response = await getMovieVideos(id);
    return response;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovieDetail(state) {
      state.detail = null;
      state.videos = [];
    },
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
      })

      .addCase(fetchMovieDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMovieDetail.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchMovieVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovieVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMovieVideos.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearMovieDetail, refresh,loadingMore } = movieSlice.actions;
export default movieSlice.reducer;
