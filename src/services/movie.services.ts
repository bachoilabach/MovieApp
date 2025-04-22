import { Movie, MovieDetail, MovieListResponse } from '@/models/movie.model';
import http from '../config/axios';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export const getAllMovie = async (
  page: number = 1
): Promise<MovieListResponse> => {
  try {
    const response = await http.get(`/movie/popular?page=${page}`);
    return response.data;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: String(error)
    })
    return { results: [], page: 0, total_pages: 0, total_results: 0 };
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
  page: number,
  query: string
): Promise<MovieListResponse> => {
  try {
    const response = await http.get('/search/movie', {
      params: {
        query: query,
        page: page
      },
    });
    return response.data
  } catch (error) {
    return { results: [], page: 0, total_pages: 0, total_results: 0 };
  }
};

export const getMovieFakeApi = async () => {
  try {
    const response = await axios.get('http://10.10.113.130:3001/movies');
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateMovieFakeApi = async (id: number, data: any) => {
  try {
    const response = await axios.put(
      `http://10.10.113.130:3001/movies/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
};
