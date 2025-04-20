import { useMovieDetail } from './useMovieDetail';
import { updateMovieFakeApi } from '@/services/movie.services';

export const useEditMovie = (id: number) => {
  const { movie, setMovie, navigation } = useMovieDetail(id);

  const handleChangeInput = (key: keyof typeof movie, value: string) => {
    if (!movie) return;

    const updatedMovie = {
      ...movie,
      [key]: value,
    };

    setMovie(updatedMovie);
  };

  const handleSave = async () => {
    if (!movie) return;

    try {
      await updateMovieFakeApi(id, movie);
      navigation.goBack();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return {
    movie,
    handleChangeInput,
    handleSave,
  };
};
