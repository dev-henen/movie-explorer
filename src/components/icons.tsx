import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const icon =
  (path: string) =>
  ({ size = 20, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={path} />
    </svg>
  );

const iconFilled =
  (path: string) =>
  ({ size = 20, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      {...props}
    >
      <path d={path} />
    </svg>
  );

export const HomeIcon = icon('M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z M9 21V12h6v9');
export const StarIcon = iconFilled(
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
);
export const StarOutlineIcon = icon(
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
);
export const TrendingUpIcon = icon('M22 7l-9 9-4-4L2 19 M22 7h-6 M22 7v6');
export const AwardIcon = icon(
  'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12'
);
export const CalendarIcon = icon(
  'M8 2v4 M16 2v4 M3 10h18 M21 8H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z'
);
export const SearchIcon = icon('M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0');
export const FilterIcon = icon('M22 3H2l8 9.46V19l4 2v-8.54L22 3z');
export const XIcon = icon('M18 6 6 18 M6 6l12 12');
export const ArrowLeftIcon = icon('M19 12H5 M12 19l-7-7 7-7');
export const HeartIcon = icon(
  'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
);
export const HeartFilledIcon = iconFilled(
  'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
);
export const ChevronRightIcon = icon('M9 18l6-6-6-6');
export const FilmIcon = icon(
  'M2 2h20v20H2z M7 2v20 M17 2v20 M2 12h20 M2 7h5 M2 17h5 M17 17h5 M17 7h5'
);
export const ClockIcon = icon('M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M12 6v6l4 2');
