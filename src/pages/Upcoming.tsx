import { useState } from 'react';
import { MovieCard } from '../components/movie/MovieCard';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingGrid } from '../components/ui/LoadingGrid';
import { useUpcoming } from '../hooks/useMovies';

const Upcoming = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useUpcoming(page);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upcoming</h1>
        <p className="mt-1 text-sm text-gray-500">Movies coming soon to theaters.</p>
      </div>

      {isLoading && <LoadingGrid count={20} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" />}
      {isError && <ErrorState message="Failed to load upcoming movies." onRetry={() => refetch()} />}

      {data && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {data.page} of {Math.min(data.total_pages, 500)}
            </span>
            <button
              disabled={page >= data.total_pages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Upcoming;
