import { NavLink } from 'react-router-dom';
import { AwardIcon, CalendarIcon, HomeIcon, TrendingUpIcon } from '../icons';

const NAV_ITEMS = [
  { to: '/', label: 'Home', Icon: HomeIcon, end: true },
  { to: '/popular', label: 'Popular', Icon: TrendingUpIcon, end: false },
  { to: '/top-rated', label: 'Top Rated', Icon: AwardIcon, end: false },
  { to: '/upcoming', label: 'Upcoming', Icon: CalendarIcon, end: false },
];

export const Sidebar = () => (
  <aside className="flex h-full w-60 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
    {/* Logo */}
    <div className="flex items-center gap-3 px-5 py-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4zm2 2v2h2V6H5zm0 4v2h2v-2H5zm0 4v2h2v-2H5zm4-8v2h6V6H9zm0 4v2h6v-2H9zm0 4v2h6v-2H9zm8-8v2h2V6h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2z" />
        </svg>
      </div>
      <span className="text-lg font-bold text-gray-900">MovieHub</span>
    </div>

    {/* Navigation */}
    <nav className="flex flex-col gap-1 px-3">
      {NAV_ITEMS.map(({ to, label, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
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
