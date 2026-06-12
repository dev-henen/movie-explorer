import { MovieSection } from '../components/movie/MovieSection';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingGrid, LoadingRow } from '../components/ui/LoadingGrid';
import { useNowPlaying, usePopular } from '../hooks/useMovies';

const Home = () => {
  const nowPlaying = useNowPlaying();
  const popular = usePopular();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Discover Movies</h1>
        <p className="mt-1 text-sm text-gray-500">Find and explore your next favorite movie.</p>
      </div>

      <section>
        {nowPlaying.isLoading && (
          <>
            <div className="mb-4 h-6 w-36 animate-pulse rounded bg-gray-200" />
            <LoadingRow count={5} />
          </>
        )}
        {nowPlaying.isError && (
          <ErrorState
            message="Failed to load now playing movies."
            onRetry={() => nowPlaying.refetch()}
          />
        )}
        {nowPlaying.data && (
          <MovieSection
            title="Now Playing"
            movies={nowPlaying.data.results.slice(0, 10)}
            viewAllPath="/upcoming"
            layout="row"
          />
        )}
      </section>

      <section>
        {popular.isLoading && (
          <>
            <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200" />
            <LoadingGrid count={6} />
          </>
        )}
        {popular.isError && (
          <ErrorState
            message="Failed to load popular movies."
            onRetry={() => popular.refetch()}
          />
        )}
        {popular.data && (
          <MovieSection
            title="Popular Movies"
            movies={popular.data.results.slice(0, 6)}
            viewAllPath="/popular"
            layout="grid"
          />
        )}
      </section>
    </div>
  );
};

export default Home;
