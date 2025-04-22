import { useToastContext } from '@/context/ToastContext';
import { Movie, MovieListResponse } from '@/models/movie.model';
import { getAllMovie } from '@/services/movie.services';
import { useEffect, useState } from 'react';
import { Status } from './useShowToast';
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
  const toast = useToastContext()

  const pullToRefresh = async () => {
    setIsUpdating((prev) => ({ ...prev, isRefresh: true }));
    await handleGetAllMovie(1);
  };

  const loadMoreMovie = async() => {
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
      pageToFetch === 1
        ? setMovies(response.results)
        : setMovies((prev) => [...prev, ...response.results]);
      setIsUpdating((prev) => ({
        ...prev,
        isRefresh: false,
        isLoadingMore: false,
      }));
    } catch (error) {
      toast.showToast(Status.error,error.message)
    }
  };

  useEffect(() => {
    handleGetAllMovie(page);
  }, []);
  return {
    movies,
    isUpdating,
    pullToRefresh,
    loadMoreMovie,
  };
};
