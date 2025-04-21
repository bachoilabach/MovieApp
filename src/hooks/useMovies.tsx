import { Movie, MovieListResponse } from '@/models/movie.model';
import { getAllMovie } from '@/services/movie.services';
import { useEffect, useState } from 'react';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const pullToRefresh = () => {
    setRefresh(true);
    setPage(1);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  const loadMoreMovie = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setLoadingMore(true);
      setPage(nextPage);
      handleGetAllMovie(nextPage);
    }
  };

  const handleGetAllMovie = async (pageToFetch: number) => {
    try {
      const response: MovieListResponse = await getAllMovie(pageToFetch);
      setMovies((prev) => [...prev, ...response.results]);
      setHasMore(response.page < response.total_pages);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setRefresh(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    handleGetAllMovie(page);
  }, []);
  return {
    movies,
    refresh,
    pullToRefresh,
    loadMoreMovie,
    loadingMore
  };
};
