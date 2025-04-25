import { Movie, MovieListResponse } from "@/models/movie.model";
import {
  getAllMovie,
  MovieSearchParams,
  searchMovie,
} from "@/services/movie.services";
import { useEffect, useState } from "react";
import { Status } from "./useShowToast";
import { toastService } from "@/services/toast.services";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/config/store";
import { fetchMovies, refresh } from "@/slices/movieSlice";

type Update = {
  isRefresh: boolean;
  isLoading: boolean;
};
export const usePagination = () => {
  // const [movies, setMovies] = useState<Movie[]>([]);
  // const [isUpdating, setIsUpdating] = useState<Update>({
  //   isLoading: false,
  //   isRefresh: false,
  // });
  // const [page, setPage] = useState<number>(1);
  // const [totalPages, setTotalPages] = useState<number>(1);
  const {
    movies,
    currentPage,
    totalPages,
    isLoading,
    isRefreshing,
    isLoadingMore,
  } = useSelector((state: RootState) => state.movies);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const pullToRefresh = async () => {
    try {
      dispatch(refresh(true));
      await dispatch(fetchMovies(1));
    } catch (error: any) {
      toastService.showToast(Status.error, error.message);
    }
  };
  const handleFetchMovies = async (pageToFetch: number) => {
    try {
      await dispatch(fetchMovies(pageToFetch));
    } catch (error: any) {
      toastService.showToast(Status.error, error.message);
    }
  };

  useEffect(() => {
    handleFetchMovies(1);
  }, []);

  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      fetchMovies(pageNum + 1);
    }
  };

  const handleSearchMovie = async (pageToFetch: number) => {
    try {
      // setIsUpdating((prev) => ({ ...prev, isLoading: true }));
      // const params: MovieSearchParams = {
      //   page: pageToFetch,
      //   query: searchTerm,
      // };
      // const response: MovieListResponse = await searchMovie(params);
      // setMovies(response.results);
      // setTotalPages(response.total_pages);
      // setIsUpdating((prev) => ({ ...prev, isLoading: false }));
    } catch (error: any) {
      toastService.showToast(Status.error, error.message);
    }
  };
  useEffect(() => {
    // setPage(1);
  }, [searchTerm]);
  // useEffect(() => {
  //   if (searchTerm === "") {
  //     fetchMovies(page);
  //   } else {
  //     // handleSearchMovie(page);
  //   }
  // }, [page, searchTerm]);
  return {
    movies,
    // page,
    totalPages,
    // isUpdating,
    goToPage,
    pullToRefresh,
    searchTerm,
    setSearchTerm,
  };
};
