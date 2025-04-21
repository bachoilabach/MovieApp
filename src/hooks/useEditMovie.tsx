import { useState } from 'react';
import { useMovieDetail } from './useMovieDetail';
import { updateMovieFakeApi } from '@/services/movie.services';
import { MovieDetail } from '@/models/movie.model';
import { isEmpty, isNumber } from '@/utils/validate';

type ErrorState = {
  title: string;
  tagline: string;
  original_language: string;
  overview: string;
};

export const useEditMovie = (id: number) => {
  const { movie, setMovie, navigation } = useMovieDetail(id);
  const [errors, setErrors] = useState<ErrorState>({
    title: '',
    tagline: '',
    original_language: '',
    overview: '',
  });

  const handleChangeInput = (key: keyof typeof movie, value: string) => {
    setErrors((prev) => ({
      ...prev,
      [key]: value.trim() === '' ? `${key} cannot be empty` : '',
    }));

    const updatedMovie = {
      ...movie,
      [key]: value,
    };

    setMovie(updatedMovie);
  };

  const validateForm = () => {
    if (!movie) return false;

    const newErrors: ErrorState = {
      title: '',
      tagline: '',
      original_language: '',
      overview: '',
    };

    if (isEmpty(movie.title)) newErrors.title = 'Title is required';
    if (isNumber(movie.title)) newErrors.title = 'Title can not include number';
    if (isEmpty(movie.tagline)) newErrors.tagline = 'Tagline is required';
    if (isEmpty(movie.overview)) newErrors.overview = 'Overview is required';
    if (isEmpty(movie.original_language))
      newErrors.original_language = 'Original language is required';

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSave = async () => {
    if (!movie) return;
    const isValid = validateForm();
    if (!isValid) return;
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
    errors,
  };
};
