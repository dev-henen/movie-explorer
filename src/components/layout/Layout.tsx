import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterIcon, SearchIcon, XIcon } from '../icons';
import { Sidebar } from './Sidebar';

const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    if (v.trim()) {
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
    <form onSubmit={handleSubmit} className="relative flex-1 max-w-lg">
      <SearchIcon
        size={17}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Search movies..."
        className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex flex-shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-6 py-3">
          <SearchBar />
          <button
            onClick={() => navigate('/search')}
            className="flex flex-shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            <FilterIcon size={15} />
            Filters
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>
      </div>
    </div>
  );
};
