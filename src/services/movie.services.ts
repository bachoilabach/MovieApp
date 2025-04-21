import { Movie, MovieDetail, MovieListResponse } from '@/models/movie.model';
import http from '../config/axios';
import axios from 'axios';

export const getAllMovie = async (
  page: number = 1
): Promise<MovieListResponse[]> => {
  try {
    const response = await http.get(`/movie/popular?page=${page}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getMovieById = async (id: number): Promise<MovieDetail> => {
  const response = await http.get(`/movie/${id}`);
  return response.data;
};

export const getMovieVideos = async (id: number) => {
  const response = await http.get(`/movie/${id}/videos`);
  return response.data.results;
};

export const searchMovie = async (
  query: string
): Promise<MovieListResponse[]> => {
  try {
    const response = await http.get('/search/movie', {
      params: {
        query: query,
      },
    });
    return response.data
  } catch (error) {
    return [];
  }
};

export const getMovieFakeApi = async () => {
  try {
    const response = await axios.get('http://10.10.113.26:3001/movies');
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateMovieFakeApi = async (id: number, data: any) => {
  try {
    const response = await axios.put(
      `http://10.10.113.26:3001/movies/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
};
