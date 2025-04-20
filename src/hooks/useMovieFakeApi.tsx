import { Movie, MovieDetail } from '@/models/movie.model';
import { getMovieFakeApi } from '@/services/movie.services';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { G } from 'react-native-svg';

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
      console.error('Failed to fetch movies:', error);
    }
  };

  useEffect(() => {
    handleGetAllMovie();
  }, []);
  useFocusEffect(()=>{
    handleGetAllMovie()
    return () => {
      
    }
  })
  return {
    movies,
    refresh,
    pullToRefresh,
  };
};
