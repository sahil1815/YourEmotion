import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import Tabs from "../components/Tabs";
import ResultGrid from "../components/ResultGrid";

const HomePage = () => {
  const { query } = useSelector((store) => store.search);

  return (
    <div>
      <SearchBar />
      {query !== "" ? (
        <div>
          <Tabs />
          <ResultGrid />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomePage;
