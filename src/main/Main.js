import React, { useState, useEffect } from "react";
// import SearchBar from "./SearchBar";
import axios from 'axios';

const Main = () => {
  // console.log(process.env.REACT_APP_API_URL); // https://recruit-api.yonple.com/recruit/251825 OK!
  // 무한 스크롤링 페이지
  const [page, setPage] = useState(0);
  // 검색어. 일단은 Main.js 에 놓고 다 만든 다음에 SearchBar.js 따로 옮기기
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getBoard = async () => {
      await axios
        .get(process.env.REACT_APP_API_URL + `/a-posts`, {
          params: {
            'page': page,
            'query': query
          }
        })
        .then(response => {
          // console.log(response.data); 
          setPosts(response.data);
        })
    }
    getBoard();
  }, [page, query]);
  

  return (
    <>
      {/* FULL BACKGROUND */}
      <div className="flex items-center justify-center min-h-screen px-5 py-5 bg-gray-100 min-w-screen">
        {/* PHONE BACKGROUND */}
        <div
          className="relative flex overflow-hidden text-gray-800 bg-white shadow-lg rounded-xl"
          style={{ width: "414px", height: "736px" }}
        >
          {/* WRAPPER */}
          <div className="w-full h-full px-5 pt-6 pb-10 overflow-y-auto bg-white">
            {/* TITLE AND SHORT DESCRIPTION */}
            <div className="mb-5 text-right">
              <h1 className="text-3xl font-bold">Infinite scrolling</h1>
              <p className="text-sm font-bold text-gray-400">
                게시물을 검색해보세요
              </p>
            </div>
            {/* SEARCH BAR */}
            <form className="relative mb-5 text-gray-500">
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
                onChange={(e) => {
                  setQuery(e.target.value);
                  // console.log(query) // query 로 input 입력값 들어오는 거 확인함.
                }}
                value={query}
              />
            </form>
            {/* BOARD */}
            {posts.map(({ title, content, id }) => {
              return (
                // 여기다가 <Link to> 를 써야 할까? 모르겠다.
                <div key={id} className="m-2 transition-all duration-300 transform scale-100 hover:scale-95">
                  <h3 className="text-lg font-bold leading-snug"> {id}. {title} </h3>
                  <p className="leading-tight">{content.slice(0, 120)}...</p>
                  <hr className="my-3 border-gray-200" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
