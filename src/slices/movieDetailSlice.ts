import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllMovie,
  getMovieById,
  getMovieVideos,
  MovieVideo,
} from "@/services/movie.services";
import { Movie, MovieDetail } from "@/models/movie.model";

interface MovieState {
  detail: MovieDetail | null;
  videos: MovieVideo[];
  isLoading: boolean;
}

const initialState: MovieState = {
  detail: null,
  videos: [],
  isLoading: false,
};

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

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {
    clearMovieDetail(state) {
      state.detail = null;
      state.videos = [];
    },
  },
  extraReducers: (builder) => {
    builder
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

export const { clearMovieDetail } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;
