import { useQuery } from '@tanstack/react-query';
import { getNowPlaying, getPopular, getTopRated, getUpcoming } from '../api/movies';

export const useNowPlaying = (page = 1) =>
  useQuery({
    queryKey: ['movies', 'now_playing', page],
    queryFn: () => getNowPlaying(page),
    staleTime: 5 * 60 * 1000,
  });

export const usePopular = (page = 1) =>
  useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => getPopular(page),
    staleTime: 5 * 60 * 1000,
  });

export const useTopRated = (page = 1) =>
  useQuery({
    queryKey: ['movies', 'top_rated', page],
    queryFn: () => getTopRated(page),
    staleTime: 5 * 60 * 1000,
  });

export const useUpcoming = (page = 1) =>
  useQuery({
    queryKey: ['movies', 'upcoming', page],
    queryFn: () => getUpcoming(page),
    staleTime: 5 * 60 * 1000,
  });
