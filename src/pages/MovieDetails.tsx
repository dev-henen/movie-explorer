import { useNavigate, useParams } from 'react-router-dom';
import { getPosterUrl } from '../api/tmdb';
import { ArrowLeftIcon, FilmIcon, HeartFilledIcon, HeartIcon, StarIcon } from '../components/icons';
import { MovieCardOverlay } from '../components/movie/MovieCardOverlay';
import { ErrorState } from '../components/ui/ErrorState';
import { useFavorites } from '../hooks/useFavorites';
import { useMovieDetails, useSimilarMovies } from '../hooks/useMovieDetails';

const fmt = new Intl.NumberFormat('en-US');

const formatCurrency = (n: number) =>
  n > 0 ? `$${fmt.format(n)}` : 'N/A';

const formatRuntime = (minutes: number | null) => {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const Skeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-8 w-48 rounded bg-gray-200" />
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      <div className="h-64 w-full max-w-xs rounded-2xl bg-gray-200 sm:h-80 lg:w-64 lg:flex-shrink-0" />
      <div className="flex-1 space-y-4 pt-2">
        <div className="h-8 w-3/4 rounded bg-gray-200" />
        <div className="h-5 w-1/2 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-4/6 rounded bg-gray-200" />
      </div>
    </div>
  </div>
);

const Dot = () => <span className="text-gray-300">•</span>;

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = Number(id);

  const { data: movie, isLoading, isError, refetch } = useMovieDetails(movieId);
  const { data: similar } = useSimilarMovies(movieId);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) return <Skeleton />;
  if (isError || !movie) {
    return (
      <div className="space-y-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
          <ArrowLeftIcon size={16} /> Back
        </button>
        <ErrorState message="Failed to load movie details." onRetry={() => refetch()} />
      </div>
    );
  }

  const posterUrl = getPosterUrl(movie.poster_path, 'w500');
  const director = movie.credits?.crew.find((c) => c.job === 'Director')?.name ?? 'N/A';
  const cast = movie.credits?.cast.slice(0, 4).map((c) => c.name).join(', ') ?? 'N/A';
  const favorited = isFavorite(movie.id);
  const runtime = formatRuntime(movie.runtime);
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : null;

  const meta = [
    year && String(year),
    runtime,
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
      >
        <ArrowLeftIcon size={16} /> Back
      </button>

      {/* Main content */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Poster */}
        <div className="flex-shrink-0">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} poster`}
              className="w-full max-w-xs rounded-2xl shadow-lg lg:w-64"
            />
          ) : (
            <div className="flex h-96 w-64 items-center justify-center rounded-2xl bg-gray-100">
              <FilmIcon size={48} className="text-gray-300" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 space-y-5">
          {/* Title & meta */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{movie.title}</h1>
            {meta.length > 0 && (
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                {meta.map((item, i) => (
                  <span key={item} className="flex items-center gap-2">
                    {i > 0 && <Dot />}
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Rating + Favorite */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <StarIcon size={18} className="text-yellow-400" />
              <span className="text-lg font-bold text-gray-900">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-sm text-gray-400">
                ({fmt.format(movie.vote_count)} votes)
              </span>
            </div>

            <button
              onClick={() => toggleFavorite(movie.id)}
              className={[
                'flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition',
                favorited
                  ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                  : 'border-blue-500 bg-white text-blue-600 hover:bg-blue-50',
              ].join(' ')}
            >
              {favorited ? (
                <><HeartFilledIcon size={15} /> Remove Favorite</>
              ) : (
                <><HeartIcon size={15} /> Add to Favorites</>
              )}
            </button>
          </div>

          {/* Overview */}
          {movie.overview && (
            <div>
              <h2 className="mb-1.5 text-base font-semibold text-gray-900">Overview</h2>
              <p className="leading-relaxed text-gray-600">{movie.overview}</p>
            </div>
          )}

          {/* Genres */}
          {movie.genres.length > 0 && (
            <div>
              <h2 className="mb-1.5 text-base font-semibold text-gray-900">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <dl className="space-y-2">
            {[
              { label: 'Release Date', value: formatDate(movie.release_date) },
              { label: 'Director', value: director },
              { label: 'Cast', value: cast },
              { label: 'Language', value: movie.original_language.toUpperCase() },
              { label: 'Budget', value: formatCurrency(movie.budget) },
              { label: 'Revenue', value: formatCurrency(movie.revenue) },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-4">
                <dt className="w-28 flex-shrink-0 text-sm text-gray-500">{label}</dt>
                <dd className="text-sm font-medium text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Similar Movies */}
      {similar && similar.results.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-bold text-gray-900">Similar Movies</h2>
          <div className="overflow-hidden rounded-2xl">
            <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
              {similar.results.slice(0, 10).map((m) => (
                <div key={m.id} className="w-36 flex-shrink-0 sm:w-40">
                  <MovieCardOverlay movie={m} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
