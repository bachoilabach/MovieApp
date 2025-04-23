import { useEffect } from 'react';
import { useMovieDetail } from './useMovieDetail';
import { updateMovieFakeApi } from '@/services/movie.services';
import { useForm } from 'react-hook-form';
import { Status, useShowToast } from './useShowToast';
import { showToast } from '@/services/toast.services';

type EditMovieForm = {
  title: string;
  tagline: string;
  original_language: string;
  overview: string;
};
export const useEditMovie = (id: number) => {
  const { movie, setMovie, navigation } = useMovieDetail(id);
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
      showToast(Status.success, 'Edit movie success')
      navigation.goBack();
    } catch (error: any) {
      showToast(Status.error, error.message)
    }
  };

  return {
    movie,
    handleSave: handleSubmit(handleSave),
    errors,
    control,
  };
};
