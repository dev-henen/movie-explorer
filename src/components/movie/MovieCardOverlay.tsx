import { Link } from 'react-router-dom';
import { getPosterUrl } from '../../api/tmdb';
import type { Movie } from '../../types/tmdb';
import { FilmIcon, StarIcon } from '../icons';

interface MovieCardOverlayProps {
  movie: Movie;
}

export const MovieCardOverlay = ({ movie }: MovieCardOverlayProps) => {
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

        {/* Rating badge */}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 backdrop-blur-sm">
          <StarIcon size={11} className="text-yellow-400" />
          <span className="text-xs font-semibold text-white">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2.5 pb-2.5 pt-10">
          <p className="line-clamp-2 text-xs font-semibold leading-tight text-white">
            {movie.title}
          </p>
        </div>
      </div>
    </Link>
  );
};
