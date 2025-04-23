import { useEffect, useState } from 'react';
import { getMovieById, getMovieVideos } from '@/services/movie.services';
import { MovieDetail } from '@/models/movie.model';
import { useNavigation } from '@react-navigation/native';
import { Status } from './useShowToast';
import { showToast } from '@/services/toast.services';
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
  const [loading, setLoading] = useState<boolean>(true);

  const handleFetchMovieData = async () => {
    const response = await getMovieById(id);
    setMovie(response);
  };

  const handleFetchTrailer = async () => {
    const videos = await getMovieVideos(id);
    const trailer = videos.find(
      (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
    );
    if (trailer) {
      setTrailerKey(trailer.key);
    }
  };

  useEffect(() => {
    if (movie?.title) {
      navigation.setOptions({
        title: movie.title,
      });
    }
  }, [movie]);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([handleFetchMovieData(), handleFetchTrailer()]);
      setLoading(false);
    } catch (error: any) {
      showToast(Status.error, error.message)
    }
  };
  useEffect(() => {
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
