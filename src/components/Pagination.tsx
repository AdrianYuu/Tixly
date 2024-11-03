import React from 'react';
import ArrowImage from '../assets/images/arrow.png'; // Adjust the path to arrow.png based on your folder structure

interface IProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: IProps) {
  return (
    <div className="flex justify-center items-center p-4 gap-4 text-customLightGrey">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-2 py-1 ${
            currentPage === index + 1
              ? 'text-customLightYellow underline'
              : 'text-customLightGrey'
          }`}
        >
          {index + 1}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full text-gray-300 disabled:opacity-50 focus:outline-none"
      >
        <img
          src={ArrowImage}
          alt="Next Page"
          className="w-10 h-10"
        />
      </button>
    </div>
  );
};

export default Pagination;
