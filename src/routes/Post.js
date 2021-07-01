import React from "react";

const Post = (props) => {
  const title = props.location.state.title;
  const content = props.location.state.content;

  const goBack = () => {
    props.history.goBack();
  };

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
            {/* DETAILS OF CONTENT */}
            <div className="flex flex-col justify-center mb-10 border border-gray-200 rounded h-4/5">
              <h2 className="mx-3 mb-5 text-2xl font-bold">{title}</h2>
              <span className="mx-3 mb-5">{content}</span>
            </div>
            {/* GO BACK BUTTON */}
            <button
              onClick={goBack}
              class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-4/12"
            >
              뒤로 가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
