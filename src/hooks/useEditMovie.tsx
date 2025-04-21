import { useEffect } from 'react';
import { useMovieDetail } from './useMovieDetail';
import { updateMovieFakeApi } from '@/services/movie.services';
import { useForm } from 'react-hook-form';
import { showToast, Status } from '@/components/ToastMessage/ToastMessage';

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
    setValue('title', movie.title);
    setValue('tagline', movie.tagline);
    setValue('original_language', movie.original_language);
    setValue('overview', movie.overview);
  }, [movie]);

  const handleSave = async (data: EditMovieForm) => {
    try {
      setMovie((prev) => ({ ...prev, ...data }));
      await updateMovieFakeApi(id, { ...movie, ...data });
      showToast(Status.success, 'Edit success');
      navigation.goBack();
    } catch (error) {
      showToast(Status.error, error.message);
    }
  };

  return {
    movie,
    handleSave: handleSubmit(handleSave),
    errors,
    control,
  };
};
