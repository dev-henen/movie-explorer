import { FilmIcon } from '../icons';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export const EmptyState = ({
  title = 'No movies found',
  message = 'Try adjusting your search or filters.',
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
      <FilmIcon size={28} className="text-gray-400" />
    </div>
    <p className="font-medium text-gray-700">{title}</p>
    <p className="mt-1 text-sm text-gray-500">{message}</p>
  </div>
);
