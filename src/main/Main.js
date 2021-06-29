import React from 'react';
import SearchBar from './SearchBar';

const Main = () => {
  return (
    <>
      {/* FULL BACKGROUND */}
      <div className="flex items-center justify-center min-h-screen px-5 py-5 bg-gray-100 min-w-screen">
        {/* PHONE BACKGROUND */}
        <div
          className="relative flex overflow-hidden text-gray-800 bg-white shadow-lg rounded-xl"
          style={{ width: "414px", height: "736px" }}
        >
          <div className="w-full h-full px-5 pt-6 pb-20 overflow-y-auto bg-white">
            {/* TITLE AND SHORT DESCRIPTION */}
            <div className="mb-5 text-right">
              <h1 className="text-3xl font-bold">Infinite scrolling</h1>
              <p className="text-sm font-bold text-gray-400">
                게시물을 검색해보세요
              </p>
            </div>
            {/* SEARCH BAR */}
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
