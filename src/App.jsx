import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";

const App = () => {
  const { results } = useSelector((state) => state.search.query);
  return (
    <div
      className={`bg-gray-900 ${
        results ? "h-fit" : "h-screen"
      } w-full text-white`}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
