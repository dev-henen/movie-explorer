import { NavLink } from 'react-router-dom';
import { CalendarIcon, HomeIcon, TrendingUpIcon, XIcon } from '../icons';
import { LayoutGrid, Star } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Home', Icon: HomeIcon, end: true },
  { to: '/popular', label: 'Popular', Icon: Star, end: false },
  { to: '/top-rated', label: 'Top Rated', Icon: TrendingUpIcon, end: false },
  { to: '/upcoming', label: 'Upcoming', Icon: CalendarIcon, end: false },
];

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => (
  <aside className="flex h-full w-60 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
    {/* Logo */}
    <div className="flex items-center gap-3 px-5 py-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
        <LayoutGrid size={18} className="text-white" />
      </div>
      <span className="flex-1 text-lg font-bold text-gray-900">MovieHub</span>
      {onClose && (
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
          aria-label="Close menu"
        >
          <XIcon size={18} />
        </button>
      )}
    </div>

    {/* Navigation */}
    <nav className="flex flex-col gap-1 px-3">
      {NAV_ITEMS.map(({ to, label, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onClose}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            ].join(' ')
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  </aside>
);
