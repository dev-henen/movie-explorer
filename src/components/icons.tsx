export {
  Home as HomeIcon,
  TrendingUp as TrendingUpIcon,
  Award as AwardIcon,
  Calendar as CalendarIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  X as XIcon,
  ArrowLeft as ArrowLeftIcon,
  Heart as HeartIcon,
  ChevronRight as ChevronRightIcon,
  Film as FilmIcon,
  Clock as ClockIcon,
  Menu as MenuIcon,
} from 'lucide-react';

import type { LucideProps } from 'lucide-react';
import { Heart, Star } from 'lucide-react';

export const StarIcon = (props: LucideProps) => (
  <Star fill="currentColor" strokeWidth={0} {...props} />
);

export const HeartFilledIcon = (props: LucideProps) => (
  <Heart fill="currentColor" strokeWidth={0} {...props} />
);
