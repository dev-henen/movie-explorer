import { Link } from 'react-router-dom';
import { getPosterUrl } from '../../api/tmdb';
import type { Movie } from '../../types/tmdb';
import { FilmIcon } from '../icons';
import { releaseYear } from '../../utils/format';
import { RatingBadge } from './RatingBadge';

interface MovieCardSquareProps {
  movie: Movie;
}

export const MovieCardSquare = ({ movie }: MovieCardSquareProps) => {
  const posterUrl = getPosterUrl(movie.poster_path);

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-100">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center">
            <FilmIcon size={36} className="text-gray-300" />
          </div>
        )}

        <RatingBadge rating={movie.vote_average} />
      </div>

      <div className="mt-2 px-0.5">
        <p className="line-clamp-1 text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
          {movie.title}
        </p>
        <p className="text-xs text-gray-500">{releaseYear(movie.release_date)}</p>
      </div>
    </Link>
  );
};
