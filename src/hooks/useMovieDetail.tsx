import { useEffect, useState } from 'react';
import { getMovieById, getMovieVideos } from '@/services/movie.services';
import { MovieDetail  } from '@/models/movie.model';
import { useNavigation } from '@react-navigation/native';

export const useMovieDetail = (id: number) => {
  const navigation = useNavigation();
  const [movie, setMovie] = useState<MovieDetail| null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieData = async () => {
    try {
      const response = await getMovieById(id);
      setMovie(response);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchTrailer = async () => {
    try {
      const videos = await getMovieVideos(id);
      const trailer = videos.find(
        (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      console.error('Error fetching movie trailer:', error);
    }
  };

  useEffect(() => {
    if (movie?.title) {
      navigation.setOptions({
        title: movie.title,
      });
    }
  }, [movie]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchMovieData(), fetchTrailer()]);
      setLoading(false);
    };
    loadData();
  }, [id]);

  return {
    movie,
    trailerKey,
    loading,
    navigation,
    setMovie
  };
};
