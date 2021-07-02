import React from "react";
import { Link } from "react-router-dom";

const Board = ({ query, posts, filteredPosts }) => {

  return (
    <>
      {!query ? (
        <>
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
        </>
      ) : (
        <>
          {filteredPosts.map((post, index) => {
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
        </>
      )}
    </>
  );
};

export default Board;
