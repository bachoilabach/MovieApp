import { useState } from 'react';
import { useMovieDetail } from './useMovieDetail';
import { updateMovieFakeApi } from '@/services/movie.services';

type ErrorState = {
  title: string;
  tagline: string;
  original_language: string;
  overview: string;
};

export const useEditMovie = (id: number) => {
  const { movie, setMovie, navigation } = useMovieDetail(id);
  const [errors, setErrors] = useState<ErrorState>();
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleChangeInput = (key: keyof typeof movie, value: string) => {
    if (!movie) return;

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

    const newErrors: ErrorState = {};
    if (!movie.title.trim()) newErrors.title = 'Title is required';
    if (!movie.tagline.trim()) newErrors.tagline = 'Tagline is required';
    if (!movie.overview.trim()) newErrors.overview = 'Overview is required';
    if (!movie.original_language.trim())
      newErrors.original_language = 'Original language is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!movie) return;

    if (!validateForm) return;
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
