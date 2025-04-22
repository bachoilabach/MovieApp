import { useEffect } from 'react';
import { useMovieDetail } from './useMovieDetail';
import { updateMovieFakeApi } from '@/services/movie.services';
import { useForm } from 'react-hook-form';
import { Status, useShowToast } from './useShowToast';

type EditMovieForm = {
  title: string;
  tagline: string;
  original_language: string;
  overview: string;
};
export const useEditMovie = (id: number) => {
  const { movie, setMovie, navigation } = useMovieDetail(id);
  const toast = useShowToast()
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EditMovieForm>({
    defaultValues: {
      title: '',
      tagline: '',
      original_language: '',
      overview: '',
    },
  });

  useEffect(() => {
    Object.entries(movie).forEach(([key, value]) => {
      if (key in control._defaultValues) {
        setValue(key as keyof EditMovieForm, value as string);
      }
    });
    return () => {
      reset({
        title: '',
        tagline: '',
        original_language: '',
        overview: '',
      });
    };
  }, [movie]);

  const handleSave = async (data: EditMovieForm) => {
    try {
      setMovie((prev) => ({ ...prev, ...data }));
      await updateMovieFakeApi(id, { ...movie, ...data });
      toast.showToast(Status.success, 'Edit movie success')
      navigation.goBack();
    } catch (error) {
    }
  };

  return {
    movie,
    handleSave: handleSubmit(handleSave),
    errors,
    control,
  };
};
