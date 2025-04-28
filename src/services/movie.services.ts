import { Movie, MovieDetail, MovieListResponse } from "@/models/movie.model";
import http from "../config/axios";
import axios from "axios";
import { Status } from "@/hooks/useShowToast";
import { toastService } from "./toast.services";

export const getAllMovie = async (
  page: number = 1
): Promise<MovieListResponse> => {
  try {
    const response = await http.get<any,MovieListResponse>(
      `/movie/popular?page=${page}`
    );
    
    if (response === null) {
      toastService.showToast(Status.error, "No data found");
    }
    return response;
  } catch (error: any) {
    toastService.showToast(Status.error, error.message);
    throw error;
  }
};

export const getMovieById = async (id: number): Promise<MovieDetail> => {
  const res = await http.get<any,MovieDetail>(`/movie/${id}`);
  
  return res;
};

export type MovieVideo = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type MovieVideosResponse = {
  id: number;
  results: MovieVideo[];
};

export const getMovieVideos = async (id: number) => {
  const res = await http.get<any, MovieVideosResponse>(`/movie/${id}/videos`);

  
  if (res === null) {
    toastService.showToast(Status.error, "No data found");
    throw new Error("No data found");
  }
  return res.results;
};

export type MovieSearchParams = {
  page: number;
  query: string;
};

export const searchMovie = async (
  args: MovieSearchParams
): Promise<MovieListResponse> => {
  try {
    const params = {
      ...args,
    };
    const res = await http.get<MovieSearchParams, MovieListResponse>(
      "/search/movie",
      {
        params,
      }
    );
    
    return res;
  } catch (error: any) {
    toastService.showToast(Status.error, error.message);
    throw error;
  }
};

export const getMovieFakeApi = async () => {
  try {
    const res = await axios.get("http://10.10.113.130:3001/movies");
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateMovieFakeApi = async (id: number, data: any) => {
  try {
    const res = await axios.put(`http://10.10.113.130:3001/movies/${id}`, data);
    return res;
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};

type AddFavouriteMovieArgs = {
  accountId: number;
  sessionId: string;
  mediaId: number;
};

type FavouriteMovieResponse = {
  status_code: number;
  status_message: string;
};

export const addFavouriteMovie = async (
  args: AddFavouriteMovieArgs
): Promise<FavouriteMovieResponse> => {
  try {
    const body = {
      media_type: "movie",
      media_id: args.mediaId,
      favorite: true,
    };

    const config = {
      params: {
        session_id: args.sessionId,
      },
    };

    const res = await http.post<AddFavouriteMovieArgs,FavouriteMovieResponse>(
      `/account/${args.accountId}/favorite`,
      body,
      config
    );

    return res;
  } catch (error: any) {
    toastService.showToast(
      Status.error,
      error?.response?.data?.status_message || error.message
    );
    throw error;
  }
};

type GetFavouritMovieParams = {
  accountId: number;
  sessionId: string;
};
export const getFavouriteMoviees = async (
  args: GetFavouritMovieParams
): Promise<MovieListResponse> => {
  try {
    const params = {
      session_id: args.sessionId,
    };
    const res = await http.get<GetFavouritMovieParams, MovieListResponse>(
      `/account/${args.accountId}/favorite/movies`,
      {
        params,
      }
    );
    
    return res;
  } catch (error: any) {
    toastService.showToast(
      Status.error,
      error?.response?.data?.status_message || error.message
    );
    throw error;
  }
};

export const deleteFavouriteMovie = async (
  accountId: number,
  sessionId: string,
  mediaId: number
): Promise<FavouriteMovieResponse> => {
  try {
    const res = await http.post<any, FavouriteMovieResponse>(
      `/account/${accountId}/favorite`,
      {
        media_type: "movie",
        media_id: mediaId,
        favorite: false,
      },
      {
        params: {
          session_id: sessionId,
        },
      }
    );
    return res;
  } catch (error: any) {
    toastService.showToast(Status.error, error.message);
    throw error;
  }
};
