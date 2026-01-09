import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../app/features/searchSlice";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuery(search))
    setSearch("");
  };
  return (
    <div className="w-full h-20 text-white bg-gray-800 flex items-center justify-center">
      <form className="flex gap-7 lg:gap-10" onSubmit={(e) => handleSubmit(e)}>
        <input
          required
          className="border border-gray-300 rounded-lg focus:outline-none px-2 lg:px-4 py-2 lg:w-130 max-w-130 h-12 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          type="text"
          value={search}
          placeholder="Search Your Emotion..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-emerald-500 transition-all duration-150 px-7 py-2 rounded-md hover:scale-95 focus:scale-100" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
