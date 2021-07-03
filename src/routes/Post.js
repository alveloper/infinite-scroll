import React from "react";
import Background from "../components/Background";

const Post = (props) => {
  const title = props.location.state.title;
  const content = props.location.state.content;

  const goBack = () => {
    props.history.goBack();
  };

  return (
    <Background>
      {/* CONTENT */}
      <div className="flex flex-col justify-center mb-10 border border-gray-200 rounded h-4/5">
        <h2 className="mx-3 mb-5 text-2xl font-bold">{title}</h2>
        <span className="mx-3 mb-5">{content}</span>
      </div>
      {/* BACK BUTTON */}
      <button
        onClick={goBack}
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-4/12"
      >
        뒤로 가기
      </button>
    </Background>
  );
};

export default Post;
