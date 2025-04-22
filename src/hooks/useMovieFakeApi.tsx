import { Movie, MovieDetail } from '@/models/movie.model';
import { getMovieFakeApi } from '@/services/movie.services';
import { useEffect, useState } from 'react';

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
    } catch (error) {
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
