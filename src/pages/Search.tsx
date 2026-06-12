import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MovieCard } from '../components/movie/MovieCard';
import { FilterBar } from '../components/search/FilterBar';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingGrid } from '../components/ui/LoadingGrid';
import { useGenres } from '../hooks/useGenres';
import { useSearchMovies } from '../hooks/useSearch';
import type { SearchFilters } from '../types/tmdb';

const EMPTY_FILTERS: SearchFilters = {
  genreId: '',
  year: '',
  minRating: '',
  sortBy: '',
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const [filters, setFilters] = useState<SearchFilters>(EMPTY_FILTERS);

  const { data, isLoading, isError, refetch } = useSearchMovies(query, filters);
  const { data: genres = [] } = useGenres();

  const hasQuery = !!query.trim();
  const hasFilters = !!(filters.genreId || filters.year || filters.minRating);
  const showResults = hasQuery || hasFilters;

  return (
    <div className="space-y-6">
      <div>
        {hasQuery ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900">
              Search Results for &ldquo;{query}&rdquo;
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {data ? `${data.total_results.toLocaleString()} results found` : 'Searching…'}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900">Browse & Filter</h1>
            <p className="mt-1 text-sm text-gray-500">
              Use the filters below to discover movies.
            </p>
          </>
        )}
      </div>

      <FilterBar
        filters={filters}
        genres={genres}
        onChange={setFilters}
        onClear={() => setFilters(EMPTY_FILTERS)}
        resultCount={data?.results.length}
      />

      {!showResults && (
        <EmptyState
          title="Start exploring"
          message="Type a movie name in the search bar or select filters above."
        />
      )}

      {showResults && isLoading && <LoadingGrid count={12} />}

      {showResults && isError && (
        <ErrorState
          message="Search failed. Please try again."
          onRetry={() => refetch()}
        />
      )}

      {showResults && data && data.results.length === 0 && !isLoading && (
        <EmptyState
          title="No results found"
          message={`No movies matched "${query || 'your filters'}". Try different terms.`}
        />
      )}

      {showResults && data && data.results.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
