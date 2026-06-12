import { useNavigate, useParams } from 'react-router-dom';
import { getBackdropUrl, getPosterUrl } from '../api/tmdb';
import { ArrowLeftIcon, ClockIcon, FilmIcon, HeartFilledIcon, HeartIcon, StarIcon } from '../components/icons';
import { MovieCard } from '../components/movie/MovieCard';
import { ErrorState } from '../components/ui/ErrorState';
import { useFavorites } from '../hooks/useFavorites';
import { useMovieDetails, useSimilarMovies } from '../hooks/useMovieDetails';

const fmt = new Intl.NumberFormat('en-US');

const formatCurrency = (n: number) =>
  n > 0 ? `$${fmt.format(n)}` : 'N/A';

const formatRuntime = (minutes: number | null) => {
  if (!minutes) return 'N/A';
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
    <div className="h-44 rounded-2xl bg-gray-200 sm:h-56" />
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
  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'w1280');
  const director = movie.credits?.crew.find((c) => c.job === 'Director')?.name ?? 'N/A';
  const cast = movie.credits?.cast
    .slice(0, 4)
    .map((c) => c.name)
    .join(', ') ?? 'N/A';
  const favorited = isFavorite(movie.id);

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
      >
        <ArrowLeftIcon size={16} /> Back
      </button>

      {/* Backdrop */}
      {backdropUrl && (
        <div className="relative h-56 overflow-hidden rounded-2xl sm:h-72">
          <img
            src={backdropUrl}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

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
        <div className="flex-1 space-y-6">
          {/* Title & meta */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{movie.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              {movie.release_date && (
                <span>{new Date(movie.release_date).getFullYear()}</span>
              )}
              {movie.runtime && (
                <span className="flex items-center gap-1">
                  <ClockIcon size={13} /> {formatRuntime(movie.runtime)}
                </span>
              )}
              {movie.original_language && (
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs uppercase">
                  {movie.original_language}
                </span>
              )}
            </div>
          </div>

          {/* Rating + Favorite */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <StarIcon size={20} className="text-yellow-400" />
              <span className="text-xl font-bold text-gray-900">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500">
                ({fmt.format(movie.vote_count)} votes)
              </span>
            </div>

            <button
              onClick={() => toggleFavorite(movie.id)}
              className={[
                'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition',
                favorited
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-blue-600 text-white hover:bg-blue-700',
              ].join(' ')}
            >
              {favorited ? (
                <>
                  <HeartFilledIcon size={16} className="text-red-500" />
                  Remove Favorite
                </>
              ) : (
                <>
                  <HeartIcon size={16} />
                  Add to Favorites
                </>
              )}
            </button>
          </div>

          {/* Overview */}
          {movie.overview && (
            <div>
              <h2 className="mb-2 text-base font-semibold text-gray-900">Overview</h2>
              <p className="leading-relaxed text-gray-600">{movie.overview}</p>
            </div>
          )}

          {/* Genres */}
          {movie.genres.length > 0 && (
            <div>
              <h2 className="mb-2 text-base font-semibold text-gray-900">Genres</h2>
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

          {/* Metadata table */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <dl className="divide-y divide-gray-100">
              {[
                { label: 'Release Date', value: formatDate(movie.release_date) },
                { label: 'Director', value: director },
                { label: 'Cast', value: cast },
                { label: 'Language', value: movie.original_language.toUpperCase() },
                { label: 'Budget', value: formatCurrency(movie.budget) },
                { label: 'Revenue', value: formatCurrency(movie.revenue) },
              ].map(({ label, value }) => (
                <div key={label} className="flex px-4 py-3">
                  <dt className="w-32 flex-shrink-0 text-sm text-gray-500">{label}</dt>
                  <dd className="text-sm font-medium text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {similar && similar.results.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-bold text-gray-900">Similar Movies</h2>
          <div className="flex gap-4 overflow-x-auto pb-3">
            {similar.results.slice(0, 10).map((movie) => (
              <div key={movie.id} className="w-36 flex-shrink-0 sm:w-44">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
