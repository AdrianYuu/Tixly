import React from 'react';
import TicketEnum from '../enums/TicketEnum';
import { getFilterLabel } from '../lib/utils';
import FilterImage from '../assets/images/filter.png';

interface IProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

function FilterOptions({ activeFilter, onFilterChange }: IProps) {
  const filters = [
    'All',
    TicketEnum.CONCERT,
    TicketEnum.MOVIE,
    TicketEnum.TOURIST_ATTRACTION,
  ];

  return (
    <div className="flex items-center gap-2 p-2 md:gap-4 md:p-4 bg-customBlack">
      <button className="hidden md:block p-1 md:p-2 text-customLightGrey focus:outline-none">
        <img src={FilterImage} alt="Filter" className="w-10 h-10" />
      </button>

      <div className="flex gap-2 md:gap-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-full border ${
              activeFilter === filter
                ? 'bg-customLightYellow text-customBlack border-transparent'
                : 'text-customLightGrey border-customLightGrey'
            }`}
          >
            {getFilterLabel(filter)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterOptions;
