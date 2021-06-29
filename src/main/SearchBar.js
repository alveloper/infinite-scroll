import React from 'react';

const SearchBar = () => {
  return (
      <form className="relative text-gray-500">
        <label
          htmlFor="search"
          className="absolute inset-y-0 left-0 flex items-center pl-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </label>
        <input
          id="search"
          type="search"
          className="w-full mt-1 text-black border-gray-300 rounded-md shadow-sm pl-9 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          placeholder="검색어를 입력하세요"
        />
      </form>
  );
};

export default SearchBar;
