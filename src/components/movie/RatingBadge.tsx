import { StarIcon } from '../icons';

interface RatingBadgeProps {
  rating: number;
}

export const RatingBadge = ({ rating }: RatingBadgeProps) => (
  <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 backdrop-blur-sm">
    <StarIcon size={11} className="text-yellow-400" />
    <span className="text-xs font-semibold text-white">{rating.toFixed(1)}</span>
  </div>
);
