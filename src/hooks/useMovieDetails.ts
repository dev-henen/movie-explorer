import { useQuery } from '@tanstack/react-query';
import { getMovieDetails, getSimilarMovies } from '../api/movies';

export const useMovieDetails = (id: number) =>
  useQuery({
    queryKey: ['movie', id, 'details'],
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });

export const useSimilarMovies = (id: number) =>
  useQuery({
    queryKey: ['movie', id, 'similar'],
    queryFn: () => getSimilarMovies(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
