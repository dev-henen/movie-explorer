import type { Genre, SearchFilters } from '../../types/tmdb';
import { FilterSelect } from '../ui/FilterSelect';

const YEARS = Array.from({ length: 35 }, (_, i) => String(new Date().getFullYear() - i));
const RATINGS = ['5', '6', '7', '7.5', '8', '8.5', '9'];
const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'vote_average.desc', label: 'Top Rated' },
  { value: 'release_date.desc', label: 'Newest' },
];

interface FilterBarProps {
  filters: SearchFilters;
  genres: Genre[];
  onChange: (filters: SearchFilters) => void;
  onClear: () => void;
  resultCount?: number;
}

const hasActiveFilters = (f: SearchFilters) =>
  !!(f.genreId || f.year || f.minRating || f.sortBy);

export const FilterBar = ({ filters, genres, onChange, onClear, resultCount }: FilterBarProps) => {
  const set = (key: keyof SearchFilters) => (value: string) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-end sm:gap-4">
        <FilterSelect
          label="Genre"
          value={filters.genreId}
          options={genres.map((g) => ({ value: String(g.id), label: g.name }))}
          onChange={set('genreId')}
        />
        <FilterSelect
          label="Year"
          value={filters.year}
          options={YEARS.map((y) => ({ value: y, label: y }))}
          onChange={set('year')}
        />
        <FilterSelect
          label="Rating"
          value={filters.minRating}
          options={RATINGS.map((r) => ({ value: r, label: `${r}+ stars` }))}
          onChange={set('minRating')}
        />
        <FilterSelect
          label="Sort By"
          value={filters.sortBy}
          options={SORT_OPTIONS}
          onChange={set('sortBy')}
        />
        {hasActiveFilters(filters) && (
          <button
            onClick={onClear}
            className="col-span-2 self-end px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 sm:col-span-1"
          >
            Clear Filters
          </button>
        )}
        {resultCount !== undefined && (
          <p className="col-span-2 text-sm text-gray-500 sm:col-span-1 sm:ml-auto sm:self-end">
            {resultCount} result{resultCount !== 1 ? 's' : ''} found
          </p>
        )}
      </div>
    </div>
  );
};
