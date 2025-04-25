import { toastService } from "@/services/toast.services";
import { useDispatch, useSelector } from "react-redux";
import { useLogin } from "./useLogin";
import { Status } from "./useShowToast";
import { AppDispatch } from "@/config/store";
import { useEffect } from "react";
import {
  addToFavourite,
  fetchFavouriteMovies,
  removeFromFavourite,
} from "@/slices/favouriteSlice";

export const useFavourite = () => {
  const { sessionId, user } = useLogin();
  const dispatch = useDispatch<AppDispatch>();

  const { favourites, isLoading } = useSelector(
    (state: any) => state.favourites
  );
  const handleAddFavouriteMovie = async (movieId: number) => {
    if (!sessionId || !user) {
      toastService.showToast(Status.error, "You need to login");
      return;
    }

    try {
      dispatch(
        addToFavourite({ accountId: user.id, sessionId, mediaId: movieId })
      );
      toastService.showToast(Status.success, "Added to favorites!");
    } catch (error: any) {
      toastService.showToast(Status.error, error.message);
    }
  };

  const handleDeleteFavouriteMovie = async (movieId: number) => {
    try {
      dispatch(
        removeFromFavourite({ accountId: user.id, sessionId, mediaId: movieId })
      );
      toastService.showToast(Status.success, "Removed from favorites");
    } catch (error: any) {
      toastService.showToast(Status.error, error.message);
    }
  };

  const handleGetFavouritMovie = async () => {
    if (!sessionId || !user) return;
    try {
      dispatch(fetchFavouriteMovies({ accountId: user.id, sessionId }));
    } catch (error: any) {
      toastService.showToast(Status.error, error.message);
    }
  };

  const isFavouriteMovie = (id: number) => {
    return favourites?.some((movie) => movie.id === id) ?? false;
  };

  useEffect(() => {
    if (sessionId && user?.id) {
      handleGetFavouritMovie();
    }
  }, [sessionId, user?.id]);
  return {
    handleAddFavouriteMovie,
    handleDeleteFavouriteMovie,
    isLoading,
    isFavouriteMovie,
    favourites,
  };
};
