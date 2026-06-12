import { Link } from 'react-router-dom';
import type { Movie } from '../../types/tmdb';
import { ChevronRightIcon } from '../icons';
import { MovieCard } from './MovieCard';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  viewAllPath?: string;
  layout?: 'row' | 'grid';
}

export const MovieSection = ({
  title,
  movies,
  viewAllPath,
  layout = 'row',
}: MovieSectionProps) => (
  <section>
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      {viewAllPath && (
        <Link
          to={viewAllPath}
          className="flex items-center gap-0.5 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all <ChevronRightIcon size={15} />
        </Link>
      )}
    </div>

    {layout === 'row' ? (
      <div className="overflow-hidden rounded-2xl">
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
          {movies.map((movie) => (
            <div key={movie.id} className="w-36 flex-shrink-0 sm:w-44">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    )}
  </section>
);
