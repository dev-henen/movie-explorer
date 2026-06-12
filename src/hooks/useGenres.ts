import { useQuery } from '@tanstack/react-query';
import { getGenres } from '../api/movies';

export const useGenres = () =>
  useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
    staleTime: 24 * 60 * 60 * 1000,
  });
