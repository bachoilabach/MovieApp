import { Movie, MovieListResponse } from "@/models/movie.model";
import {
  addFavouriteMovie,
  deleteFavouriteMovie,
  getAllMovie,
  getFavouriteMoviees,
} from "@/services/movie.services";
import { useEffect, useState } from "react";
import { Status } from "./useShowToast";
import { showToast } from "@/services/toast.services";
import { useAuth } from "@/context/AuthContext";

type Update = {
  isRefresh: boolean;
  isLoadingMore: boolean;
};
export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isUpdating, setIsUpdating] = useState<Update>({
    isRefresh: false,
    isLoadingMore: false,
  });
  const { sessionId, user } = useAuth();
  const [favourMovies, setFavourMovies] = useState<Movie[]>([]);

  const pullToRefresh = async () => {
    setIsUpdating((prev) => ({ ...prev, isRefresh: true }));
    await handleGetAllMovie(1);
    await handleGetFavouritMovie();
  };

  const loadMoreMovie = async () => {
    if (!isUpdating.isLoadingMore) {
      const nextPage = page + 1;
      setIsUpdating((prev) => ({ ...prev, isLoadingMore: true }));
      setPage(nextPage);
      await handleGetAllMovie(nextPage);
    }
  };

  const handleGetAllMovie = async (pageToFetch: number) => {
    try {
      const response: MovieListResponse = await getAllMovie(pageToFetch);
      if (pageToFetch === 1) {
        setMovies(response.results);
      } else {
        setMovies((prev) => [...prev, ...response.results]);
      }
      setIsUpdating((prev) => ({
        ...prev,
        isRefresh: false,
        isLoadingMore: false,
      }));
    } catch (error: any) {
      showToast(Status.error, error.message);
    }
  };

  const handleAddFavouriteMovie = async (movieId: number) => {
    try {
      if (!sessionId || !user) {
        showToast(Status.error, "You need to login");
        return;
      }
      await addFavouriteMovie(user.id, sessionId, movieId);
      await handleGetFavouritMovie();
      showToast(Status.success, "Added to favorites!");
    } catch (error: any) {
      showToast(Status.error, error.message);
    }
  };

  const handleDeleteFavouriteMovie = async (movieId: number) => {
    try {
      await deleteFavouriteMovie(user.id, sessionId, movieId);
      await handleGetFavouritMovie();
      showToast(Status.success, "Delete favorite movie");
    } catch (error: any) {
      showToast(Status.error, error.message);
    }
  };

  const handleGetFavouritMovie = async () => {
    try {
      if (!sessionId || !user) return;
      const res = await getFavouriteMoviees(user.id, sessionId);
      setFavourMovies(res.results);
    } catch (error: any) {
      showToast(Status.error, error.message);
    }
  };

  const isFavouriteMovie = (id: number) => {
    return favourMovies.some((movie) => movie.id === id);
  };

  useEffect(() => {
    handleGetAllMovie(page);
  }, []);
  useEffect(() => {
    handleGetFavouritMovie();
  }, []);

  useEffect(() => {
    if (sessionId && user) {
      handleGetFavouritMovie()
    }
  }, [sessionId, user?.id]);

  return {
    movies,
    isUpdating,
    pullToRefresh,
    loadMoreMovie,
    handleAddFavouriteMovie,
    favourMovies,
    isFavouriteMovie,
    handleDeleteFavouriteMovie,
  };
};
