interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export const Pagination = ({ page, totalPages, onPrev, onNext }: PaginationProps) => (
  <div className="flex items-center justify-center gap-3 pt-4">
    <button
      disabled={page === 1}
      onClick={onPrev}
      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Previous
    </button>
    <span className="text-sm text-gray-500">
      Page {page} of {Math.min(totalPages, 500)}
    </span>
    <button
      disabled={page >= totalPages}
      onClick={onNext}
      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Next
    </button>
  </div>
);
