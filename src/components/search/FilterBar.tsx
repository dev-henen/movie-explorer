import type { Genre, SearchFilters } from '../../types/tmdb';

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

const Select = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-500">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      <option value="">All {label}s</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

const hasActiveFilters = (f: SearchFilters) =>
  !!(f.genreId || f.year || f.minRating || f.sortBy);

export const FilterBar = ({ filters, genres, onChange, onClear, resultCount }: FilterBarProps) => {
  const set = (key: keyof SearchFilters) => (value: string) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-4">
        <Select
          label="Genre"
          value={filters.genreId}
          options={genres.map((g) => ({ value: String(g.id), label: g.name }))}
          onChange={set('genreId')}
        />
        <Select
          label="Year"
          value={filters.year}
          options={YEARS.map((y) => ({ value: y, label: y }))}
          onChange={set('year')}
        />
        <Select
          label="Rating"
          value={filters.minRating}
          options={RATINGS.map((r) => ({ value: r, label: `${r}+ stars` }))}
          onChange={set('minRating')}
        />
        <Select
          label="Sort By"
          value={filters.sortBy}
          options={SORT_OPTIONS}
          onChange={set('sortBy')}
        />
        {hasActiveFilters(filters) && (
          <button
            onClick={onClear}
            className="self-end rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
          >
            Clear Filters
          </button>
        )}
        {resultCount !== undefined && (
          <p className="ml-auto self-end text-sm text-gray-500">
            {resultCount} result{resultCount !== 1 ? 's' : ''} found
          </p>
        )}
      </div>
    </div>
  );
};
