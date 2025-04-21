import { useEffect, useState } from 'react';
import { getMovieById, getMovieVideos } from '@/services/movie.services';
import { MovieDetail } from '@/models/movie.model';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
const defaultMovie: MovieDetail = {
   adult: false,
    backdrop_path: '',
    belongs_to_collection: null,
    budget: 0,
    genres: [],
    homepage: '',
    id: 0,
    imdb_id: '',
    origin_country: [],
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    production_companies: [],
    production_countries: [],
    release_date: '',
    revenue: 0,
    runtime: 0,
    spoken_languages: [],
    status: '',
    tagline: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
};

export const useMovieDetail = (id: number) => {
  const navigation = useNavigation();
  const [movie, setMovie] = useState<MovieDetail>(defaultMovie);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleFetchMovieData = async () => {
    try {
      const response = await getMovieById(id);
      setMovie(response);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error),
      });
    }
  };

  const handleFetchTrailer = async () => {
    try {
      const videos = await getMovieVideos(id);
      const trailer = videos.find(
        (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error),
      });
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
      await Promise.all([handleFetchMovieData(), handleFetchTrailer()]);
      setLoading(false);
    };
    loadData();
  }, [id]);

  return {
    movie,
    trailerKey,
    loading,
    navigation,
    setMovie,
  };
};
