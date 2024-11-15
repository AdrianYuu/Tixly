import React, { useState } from 'react';

interface IProps {
  onSearch: (query: string) => void;
  placeholder: string;
}

function SearchBar({ onSearch, placeholder }: IProps) {
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    onSearch(event.target.value);
  }

  return (
    <div className="p-4">
      <div className="relative flex items-center text-customLightGrey">
        <svg
          className="absolute left-4 w-5 h-5 text-customLightGrey"
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
          placeholder={placeholder}
          onChange={handleSearch}
          className="w-full p-3 pl-12 rounded-3xl text-customLightGrey bg-customDarkGrey placeholder-customLightGrey focus:outline-none"
        />
      </div>
    </div>
  );
}

export default SearchBar;
