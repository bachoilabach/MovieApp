import { RootState } from "@/store/store";

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectCurrentPage = (state: RootState) => state.movies.currentPage;
export const selectTotalPages = (state: RootState) => state.movies.totalPages;
export const selectIsLoading = (state: RootState) => state.movies.isLoading;
export const selectIsRefreshing = (state: RootState) => state.movies.isRefreshing;
