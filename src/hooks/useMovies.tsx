import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchMovies, loadingMore, refresh } from "@/slices/movieSlice";
import {
  selectCurrentPage,
  selectIsLoading,
  selectIsRefreshing,
  selectMovies,
  selectTotalPages,
} from "@/store/Selector/MovieSelector";

export const useMovies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector(selectMovies);
  const isLoading = useSelector(selectIsLoading);
  const isLoadingMore = useSelector(selectIsLoading);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    handleGetAllMovies();
  }, [dispatch]);
  const handleGetAllMovies = () => {
    dispatch(fetchMovies(1));
  };

  const pullToRefresh =  () => {
    dispatch(refresh(true));
    dispatch(fetchMovies(1));
    dispatch(refresh(false));
  };

  const loadMoreMovie = () => {
    dispatch(loadingMore(true));
    if (!isLoadingMore && currentPage < totalPages) {
      dispatch(fetchMovies(currentPage + 1));
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
