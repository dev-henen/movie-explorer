import { useQuery } from '@tanstack/react-query';
import { discoverMovies, searchMovies } from '../api/movies';
import type { Movie, SearchFilters } from '../types/tmdb';

const applyClientFilters = (movies: Movie[], filters: SearchFilters): Movie[] => {
  let results = movies;

  if (filters.genreId) {
    results = results.filter((m) => m.genre_ids.includes(Number(filters.genreId)));
  }
  if (filters.minRating) {
    results = results.filter((m) => m.vote_average >= Number(filters.minRating));
  }
  if (filters.year) {
    results = results.filter((m) => m.release_date?.startsWith(filters.year));
  }
  if (filters.sortBy === 'vote_average.desc') {
    results = [...results].sort((a, b) => b.vote_average - a.vote_average);
  } else if (filters.sortBy === 'release_date.desc') {
    results = [...results].sort((a, b) =>
      (b.release_date ?? '').localeCompare(a.release_date ?? '')
    );
  }

  return results;
};

export const useSearchMovies = (query: string, filters: SearchFilters, page = 1) => {
  const hasTextQuery = query.trim().length > 1;
  const hasFilters = !!(filters.genreId || filters.year || filters.minRating);
  const enabled = hasTextQuery || hasFilters;

  return useQuery({
    queryKey: ['search', query, filters, page],
    queryFn: async () => {
      if (hasTextQuery) {
        const data = await searchMovies(query.trim(), page);
        return { ...data, results: applyClientFilters(data.results, filters) };
      }
      return discoverMovies({
        ...(filters.genreId && { with_genres: filters.genreId }),
        ...(filters.year && { primary_release_year: filters.year }),
        ...(filters.minRating && { 'vote_average.gte': filters.minRating }),
        sort_by: filters.sortBy || 'popularity.desc',
        page,
      });
    },
    enabled,
    staleTime: 30_000,
  });
};
