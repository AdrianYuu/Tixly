import React from 'react';

interface IProps {
  onSortChange: (sortBy: string) => void;
}

function SortOptions({ onSortChange }: IProps) {
  return (
    <div className="flex items-center justify-end p-4 gap-2">
      <span className="text-customLightGrey">Sort By:</span>
      
      <div className="relative">
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none px-4 py-3 rounded-full text-customLightGrey bg-customDarkGrey focus:outline-none pr-8"
        >
          <option value="date">Most Popular</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
        
        <svg
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-customLightGrey pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default SortOptions;
