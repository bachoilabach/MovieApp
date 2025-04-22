import { Movie, MovieListResponse } from '@/models/movie.model';
import { getAllMovie, searchMovie } from '@/services/movie.services';
import { useEffect, useState } from 'react';
type Update = {
  isRefresh: boolean;
  isLoading: boolean;
};
export const usePagination = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isUpdating, setIsUpdating] = useState<Update>({
    isLoading: false,
    isRefresh: false,
  });
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const pullToRefresh = async () => {
    try {
      setIsUpdating((prev) => ({ ...prev, isRefresh: true }));
      await fetchMovies(1);
    } catch (error) {}
  };
  const fetchMovies = async (pageToFetch: number) => {
    try {
      setIsUpdating((prev) => ({ ...prev, isLoading: true }));
      const responses: MovieListResponse = await getAllMovie(pageToFetch);
      setPage(pageToFetch);
      setMovies(responses.results);
      setTotalPages(responses.total_pages);
      setIsUpdating((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {}
  };

  useEffect(() => {
    fetchMovies(page);
  }, []);

  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setPage(pageNum);
      if (searchTerm === '') {
        fetchMovies(pageNum);
      } else {
        handleSearchMovie(pageNum);
      }
    }
  };

  const handleSearchMovie = async (pageToFetch: number) => {
    try {
      setIsUpdating((prev) => ({ ...prev, isLoading: true }));
      const response: MovieListResponse = await searchMovie(
        pageToFetch,
        searchTerm
      );
      setMovies(response.results);
      setTotalPages(response.total_pages);
      setIsUpdating((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {}
  };
  useEffect(() => {
    if (searchTerm === '') {
      fetchMovies(page);
    } else {
      handleSearchMovie(page);
    }
  }, [page, searchTerm]);
  return {
    movies,
    page,
    totalPages,
    isUpdating,
    goToPage,
    pullToRefresh,
    searchTerm,
    setSearchTerm,
  };
};
