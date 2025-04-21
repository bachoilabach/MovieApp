import { Movie, MovieListResponse } from '@/models/movie.model';
import { getAllMovie, searchMovie } from '@/services/movie.services';
import { useEffect, useState } from 'react';

export const usePagination = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const pullToRefresh = () => {
    setRefresh(true);
    setPage(1);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };
  const fetchMovies = async (pageToFetch: number) => {
    try {
      setLoading(true);
      const response: MovieListResponse = await getAllMovie(pageToFetch);
      setMovies(response.results);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]); 

  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setPage(pageNum);
    }
  };

  const handleSearchMovie = async () => {
    const response: MovieListResponse = await searchMovie(searchTerm)
    setMovies(response.results)
  }

  const onChangeSearchTerm = (value: string) => {
    setSearchTerm(value);
    // setPage(1)
    searchTerm === '' ? fetchMovies(1) : handleSearchMovie()
  };
  return {
    movies,
    page,
    totalPages,
    loading,
    goToPage,
    refresh,
    pullToRefresh,
    searchTerm,
    onChangeSearchTerm,
  };
};
