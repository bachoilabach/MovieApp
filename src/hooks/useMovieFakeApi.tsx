import { Movie, MovieDetail } from '@/models/movie.model';
import { getMovieFakeApi } from '@/services/movie.services';
import { useEffect, useState } from 'react';
import { Status } from './useShowToast';
import { toastService } from '../services/toast.services';

export const useMovieFakeApi = () => {
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const pullToRefresh = async () => {
    setRefresh(true);
    await handleGetAllMovie();
    setRefresh(false);
  };

  const handleGetAllMovie = async () => {
    try {
      const response = await getMovieFakeApi();
      setMovies(response);
    } catch (error: any) {
      toastService.showToast(Status.error, error.message);
    }
  };

  useEffect(() => {
    handleGetAllMovie();
  }, [movies]);

  return {
    movies,
    refresh,
    pullToRefresh,
  };
};
