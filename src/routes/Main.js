import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SearchBar from "../mainComponents/SearchBar";
import Board from "../mainComponents/Board";

const Main = () => {
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  // 스크롤링: 페이지마다 데이터 받아오는 함수
  const fetchPosts = async (page) => {
    await axios
      .get(process.env.REACT_APP_API_URL + `/a-posts`, {
        params: {
          page: page,
        },
      })
      .then((response) => {
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        setLoading(true);
      });
  };

  // 스크롤링: 데이터 받아오기. page 바뀔 때마다 리렌더링
  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // 스크롤링: Inersection observer API로 무한 스크롤링하는 기능
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

  // 필터링: SearchBar.js -> Main.js 로 데이터를 넘기기 위해 사용할 함수.
  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  // 필터링: query에 따라 데이터 받아오는 함수
  const fetchFilteredPosts = async (query) => {
    await axios
      .get(process.env.REACT_APP_API_URL + `/a-posts`, {
        params: {
          search: query,
        },
      })
      .then((response) => {
        setFilteredPosts(response.data);
      });
  };

  // 필터링: 쿼리가 변할 때마다 리렌더링
  // + 선택기능: debounce 
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFilteredPosts(query);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

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
            <SearchBar handleQueryChange={handleQueryChange} />
            {/* BOARD */}
            <Board
              query={query}
              posts={posts}
              filteredPosts={filteredPosts}
            />
            <div ref={pageEnd}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
