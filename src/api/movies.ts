import type { Genre, Movie, MovieDetails, PaginatedResponse } from '../types/tmdb';
import { tmdbClient } from './tmdb';

export const getNowPlaying = (page = 1) =>
  tmdbClient
    .get<PaginatedResponse<Movie>>('/movie/now_playing', { params: { page } })
    .then((r) => r.data);

export const getPopular = (page = 1) =>
  tmdbClient
    .get<PaginatedResponse<Movie>>('/movie/popular', { params: { page } })
    .then((r) => r.data);

export const getTopRated = (page = 1) =>
  tmdbClient
    .get<PaginatedResponse<Movie>>('/movie/top_rated', { params: { page } })
    .then((r) => r.data);

export const getUpcoming = (page = 1) =>
  tmdbClient
    .get<PaginatedResponse<Movie>>('/movie/upcoming', { params: { page } })
    .then((r) => r.data);

export const getMovieDetails = (id: number) =>
  tmdbClient
    .get<MovieDetails>(`/movie/${id}`, { params: { append_to_response: 'credits' } })
    .then((r) => r.data);

export const getSimilarMovies = (id: number) =>
  tmdbClient
    .get<PaginatedResponse<Movie>>(`/movie/${id}/similar`)
    .then((r) => r.data);

export const searchMovies = (query: string, page = 1) =>
  tmdbClient
    .get<PaginatedResponse<Movie>>('/search/movie', { params: { query, page } })
    .then((r) => r.data);

export const discoverMovies = (params: {
  with_genres?: string;
  primary_release_year?: string;
  'vote_average.gte'?: string;
  sort_by?: string;
  page?: number;
}) =>
  tmdbClient
    .get<PaginatedResponse<Movie>>('/discover/movie', { params })
    .then((r) => r.data);

export const getGenres = () =>
  tmdbClient
    .get<{ genres: Genre[] }>('/genre/movie/list')
    .then((r) => r.data.genres);
