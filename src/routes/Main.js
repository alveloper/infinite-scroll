import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Main = () => {
  const [query, setQuery] = useState("");
  
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  // 데이터 받아오기
  const fetchPosts = async (page) => {
    await axios
      .get(process.env.REACT_APP_API_URL + `/a-posts`, {
        params: {
          page: page,
        },
      })
      .then((response) => {
        // console.log(response.data); // 확인!
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        setLoading(true);
      });
  };

  // 데이터 받아오기. page 바뀔 때마다 리렌더링
  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Inersection observer API로 무한 스크롤링하는 기능
  const pageEnd = useRef();
  let num = 1;
  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            num++;
            loadMore(); // 만약 스크롤이 마지막에 닿았다면 이전 페이지넘버에 +1 하기.
            if (num >= 10) {
              observer.unobserve(pageEnd.current);
            }
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current);
    }
  }, [loading, num]);

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
            {posts.map((post, index) => {
              const id = post.id;
              const title = post.title;
              const content = post.content;

              return (
                <div
                  key={index}
                  className="p-2 transition-all duration-300 transform bg-white hover:bg-gray-50"
                >
                  <Link
                    to={{
                      pathname: `/post/${id}`,
                      state: {
                        title,
                        content,
                      },
                    }}
                  >
                    <h3 className="text-lg font-bold leading-snug">
                      {id}. {title}
                    </h3>
                    <p className="leading-tight">{content.slice(0, 120)}...</p>
                  </Link>
                </div>
              );
            })}
            <div ref={pageEnd}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
