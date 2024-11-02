import React from 'react';
import TicketEnum from '../enums/TicketEnum';
import { getFilterLabel } from '../lib/utils';

interface IProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

function FilterOptions({ activeFilter, onFilterChange }: IProps) {
  const filters = ['All', TicketEnum.CONCERT, TicketEnum.MOVIE, TicketEnum.TOURIST_ATTRACTION];

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-900">
      <button className="p-2 border border-gray-500 rounded-full text-gray-400 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 12a8.25 8.25 0 0116.5 0m-8.25-8.25a8.25 8.25 0 110 16.5M8.625 12c0-1.5 1.125-2.625 2.625-2.625S14.25 10.5 14.25 12s-1.125 2.625-2.625 2.625S8.625 13.5 8.625 12z"
          />
        </svg>
      </button>

      <div className="flex gap-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-6 py-2 rounded-full border ${
              activeFilter === filter
                ? 'bg-yellow-500 text-gray-900 border-transparent'
                : 'text-gray-400 border-gray-500'
            }`}
          >
            {getFilterLabel(filter)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterOptions;
