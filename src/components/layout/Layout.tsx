import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterIcon, MenuIcon } from '../icons';
import { Sidebar } from './Sidebar';
import { SearchBar } from './SearchBar';

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
