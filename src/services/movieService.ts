import axios from 'axios';
import type { Movie } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const API_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${API_URL}/search/movie`, {
      params: {
        query,
        api_key: API_KEY,
      },
    });

    if (response.data.results) {
      return response.data.results;  
    } else {
      throw new Error('No movies found');
    }
  } catch (error) {
    console.error('Error fetching movies:', error);  
    throw new Error('Failed to fetch movies');
  }
};
