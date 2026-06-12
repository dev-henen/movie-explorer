interface LoadingGridProps {
  count?: number;
  className?: string;
}

const LoadingCard = () => (
  <div className="animate-pulse">
    <div className="aspect-[2/3] rounded-xl bg-gray-200" />
    <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
    <div className="mt-1 h-3 w-1/2 rounded bg-gray-200" />
  </div>
);

export const LoadingGrid = ({ count = 6, className = 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6' }: LoadingGridProps) => (
  <div className={className}>
    {Array.from({ length: count }).map((_, i) => (
      <LoadingCard key={i} />
    ))}
  </div>
);

export const LoadingRow = ({ count = 5 }: { count?: number }) => (
  <div className="flex gap-4 overflow-hidden">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="w-40 flex-shrink-0 animate-pulse sm:w-48">
        <div className="aspect-[2/3] rounded-xl bg-gray-200" />
        <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
        <div className="mt-1 h-3 w-1/2 rounded bg-gray-200" />
      </div>
    ))}
  </div>
);
