import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/config/store";
import { fetchMovies, loadingMore, refresh } from "@/slices/movieSlice";

export const useMovies = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    movies,
    currentPage,
    totalPages,
    isLoading,
    isRefreshing,
    isLoadingMore,
  } = useSelector((state: RootState) => state.movies);
  useEffect(() => {
    dispatch(fetchMovies(1));
  }, [dispatch]);

  const pullToRefresh = async () => {
    dispatch(refresh(true));
    await dispatch(fetchMovies(1));
    dispatch(refresh(false));
  };

  const loadMoreMovie = async () => {
    dispatch(loadingMore(true));
    if (!isLoadingMore && currentPage < totalPages) {
      await dispatch(fetchMovies(currentPage + 1));
    }
    dispatch(loadingMore(false));
  };
  return {
    movies,
    isLoading,
    pullToRefresh,
    loadMoreMovie,
    isRefreshing,
    isLoadingMore,
  };
};
