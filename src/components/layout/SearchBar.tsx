import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, XIcon } from '../icons';

export const SearchBar = () => {
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
