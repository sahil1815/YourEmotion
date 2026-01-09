import React, { useState } from "react";
import { setActiveTab } from "../app/features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
const Tabs = () => {
  const tabs = ["photos", "videos", "gifs"];

  const dispatch = useDispatch();
  const activeTab = useSelector(state => state.search.activeTab)

  return (
    <div className="flex flex-row gap-2 bg-gray-700 p-1 my-5 lg:mx-10 mx-5 rounded-lg w-fit">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => dispatch(setActiveTab(tab))}
          className={`px-6 py-2 rounded-md uppercase transition-all duration-200 ${
            activeTab === tab
              ? "bg-emerald-500 text-white shadow-sm"
              : "text-gray-200 hover:scale-95 hover:bg-gray-200 hover:text-black"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
