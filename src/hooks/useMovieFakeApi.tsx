import { Movie, MovieDetail } from '@/models/movie.model';
import { getMovieFakeApi } from '@/services/movie.services';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

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
      Toast.show({
        type: 'error',
        text1: String(error),
      });
    }
  };

  useEffect(() => {
    handleGetAllMovie();
  }, []);
  useFocusEffect(() => {
    handleGetAllMovie();
    return () => {};
  });
  return {
    movies,
    refresh,
    pullToRefresh,
  };
};
