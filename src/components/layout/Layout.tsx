import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterIcon, MenuIcon, SearchIcon, XIcon } from '../icons';
import { Sidebar } from './Sidebar';

const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    if (v.trim().length > 1) {
      navigate(`/search?q=${encodeURIComponent(v.trim())}`, { replace: true });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  const clear = () => {
    setValue('');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex-1">
      <SearchIcon
        size={17}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Search movies..."
        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <XIcon size={15} />
        </button>
      )}
    </form>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="flex min-h-screen overflow-x-clip bg-white">
      {/* Mobile backdrop overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed drawer on mobile, sticky column on desktop */}
      <div
        className={[
          'fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out',
          'lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Content column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className={`sticky top-0 z-10 flex flex-shrink-0 items-center gap-3 bg-white px-4 py-3 transition-shadow lg:px-6 ${scrolled ? 'border-b border-gray-200 shadow-sm' : ''}`}>
          {/* Hamburger — only on mobile/tablet */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex-shrink-0 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
          >
            <MenuIcon size={20} />
          </button>

          <SearchBar />

          <button
            onClick={() => navigate('/search')}
            className="flex flex-shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 sm:px-4"
          >
            <FilterIcon size={15} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </header>

        <main className="flex-1 px-4 py-4 lg:px-6 lg:py-6">{children}</main>
      </div>
    </div>
  );
};
