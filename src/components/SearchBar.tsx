import React, { useState } from 'react';

interface IProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: IProps) {
  const [query, setQuery] = useState('');

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    onSearch(event.target.value);
  }

  return (
    <div className="p-4">
      <div className="relative flex items-center text-gray-300">
        <svg
          className="absolute left-4 w-5 h-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          placeholder="Where do you want to go?"
          value={query}
          onChange={handleSearch}
          className="w-full p-3 pl-12 rounded-3xl text-gray-300 bg-gray-700 placeholder-gray-500 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default SearchBar;
