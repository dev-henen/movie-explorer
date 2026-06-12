import axios from 'axios';

export const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const getPosterUrl = (
  path: string | null,
  size: 'w185' | 'w342' | 'w500' | 'original' = 'w500'
): string | null => (path ? `${IMAGE_BASE}/${size}${path}` : null);

export const getBackdropUrl = (
  path: string | null,
  size: 'w780' | 'w1280' | 'original' = 'w1280'
): string | null => (path ? `${IMAGE_BASE}/${size}${path}` : null);
