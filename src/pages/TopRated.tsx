import { useState } from 'react';
import { MovieCard } from '../components/movie/MovieCard';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingGrid } from '../components/ui/LoadingGrid';
import { Pagination } from '../components/ui/Pagination';
import { useTopRated } from '../hooks/useMovies';

const TopRated = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useTopRated(page);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Top Rated</h1>
        <p className="mt-1 text-sm text-gray-500">The highest rated movies of all time.</p>
      </div>

      {isLoading && <LoadingGrid count={20} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" />}
      {isError && <ErrorState message="Failed to load top rated movies." onRetry={() => refetch()} />}

      {data && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination
            page={data.page}
            totalPages={data.total_pages}
            onPrev={() => setPage((p) => p - 1)}
            onNext={() => setPage((p) => p + 1)}
          />
        </>
      )}
    </div>
  );
};

export default TopRated;
