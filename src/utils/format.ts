const fmt = new Intl.NumberFormat('en-US');

export const releaseYear = (date: string) =>
  date ? new Date(date).getFullYear() : 'N/A';

export const formatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatRuntime = (minutes: number | null) => {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

export const formatCurrency = (n: number) =>
  n > 0 ? `$${fmt.format(n)}` : 'N/A';

export const formatVoteCount = (n: number) => fmt.format(n);
