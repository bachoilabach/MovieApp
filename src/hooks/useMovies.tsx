import { Movie, MovieListResponse } from '@/models/movie.model';
import { getAllMovie } from '@/services/movie.services';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
type Update = {
  isRefresh: boolean;
  hasMore: boolean;
  isLoadingMore: boolean;
};
export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isUpdating, setIsUpdating] = useState<Update>({
    isRefresh: false,
    hasMore: true,
    isLoadingMore: false,
  });

  const pullToRefresh = async() => {
    setIsUpdating((prev) => ({ ...prev, isRefresh: true }));
    handleGetAllMovie(1)
    setPage(1);
    setIsUpdating((prev) => ({ ...prev, isRefresh: false }));
  };

  const loadMoreMovie = () => {
    if (!isUpdating.isLoadingMore && isUpdating.hasMore) {
      const nextPage = page + 1;
      setIsUpdating((prev) => ({ ...prev, isLoadingMore: true }));
      setPage(nextPage);
      handleGetAllMovie(nextPage);
    }
  };

  const handleGetAllMovie = async (pageToFetch: number) => {
    try {
      const response: MovieListResponse = await getAllMovie(pageToFetch);
      setMovies((prev) => [...prev, ...response.results]);
      setIsUpdating((prev) => ({
        ...prev,
        hasMore: response.page < response.total_pages,
      }));
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error),
      });
    } finally {
      setIsUpdating((prev) => ({
        ...prev,
        isRefresh: false,
        isLoadingMore: false,
      }));
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
