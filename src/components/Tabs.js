import React from "react";

const Tabs = ({ tab, setTab }) => {
  return (
    <ul className="flex cursor-pointer">
      <li
        onClick={() => {
          setTab("a");
        }}
        className={`px-4 py-2 ${tab === "a" ? "text-green-400 font-bold" : ""}`}
      >
        A posts
      </li>
      <li
        onClick={() => {
          setTab("b");
        }}
        className={`px-4 py-2 ${tab === "b" ? "text-green-400 font-bold" : ""}`}
      >
        B posts
      </li>
    </ul>
  );
};

export default Tabs;
