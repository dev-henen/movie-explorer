import { Link } from 'react-router-dom';
import { getPosterUrl } from '../../api/tmdb';
import type { Movie } from '../../types/tmdb';
import { FilmIcon, StarIcon } from '../icons';

interface MovieCardProps {
  movie: Movie;
}

const releaseYear = (date: string) => (date ? new Date(date).getFullYear() : 'N/A');

export const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = getPosterUrl(movie.poster_path);

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl"
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-100">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex aspect-[2/3] items-center justify-center">
            <FilmIcon size={36} className="text-gray-300" />
          </div>
        )}

        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 backdrop-blur-sm">
          <StarIcon size={11} className="text-yellow-400" />
          <span className="text-xs font-semibold text-white">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="mt-2 px-0.5">
        <p className="line-clamp-1 text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {movie.title}
        </p>
        <p className="text-xs text-gray-500">{releaseYear(movie.release_date)}</p>
      </div>
    </Link>
  );
};
