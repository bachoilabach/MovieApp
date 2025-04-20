import { Movie, MovieDetail, MovieListResponse } from '@/models/movie.model';
import http from '../config/axios';
import axios from 'axios';

export const getAllMovie = async (
  page: number = 1,
  query: string
): Promise<MovieListResponse[]> => {
  try {
    console.log(query)
    const response = await http.get(`/movie/popular?page=${page}&query=${query}`);
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

export const getMovieFakeApi = async ()=> {
  try {
    const response = await axios.get('http://192.168.1.11:3001/movies');
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateMovieFakeApi = async (id: number, data: any) => {
  try {
    const response = await axios.put(`http://192.168.1.11:3001/movies/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
};