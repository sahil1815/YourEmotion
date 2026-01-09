import React, { useEffect } from "react";
import { fetchPhotos, fetchVideos, fetchGIF } from "../api/mediaApi";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading, setResults } from "../app/features/searchSlice";
import ResultCard from "./ResultCard";

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, loading, error } = useSelector(
    (store) => store.search
  );

  useEffect(() => {
    const getData = async () => {
      // if query is empty
      if (!query.trim()) {
        dispatch(setResults([]));
        return;
      }

      try {
        dispatch(setLoading());
        let data = [];

        if (activeTab === "photos") {
          let response = await fetchPhotos(query);
          if (!response || response.length === 0) {
            throw new Error("No photos found");
          }
          data = response.map((photo) => ({
            id: photo.id,
            type: "photo",
            title: photo.alt_description || "Photo",
            thumbnail: photo.urls.small,
            src: photo.urls.full,
          }));
        } else if (activeTab === "videos") {
          let response = await fetchVideos(query);
          if (!response || response.length === 0) {
            throw new Error("No videos found");
          }
          data = response.map((video) => ({
            id: video.id,
            type: "video",
            title: video.user.name || "Video",
            thumbnail: video.image,
            src: video.video_files[0].link,
          }));
        } else if (activeTab === "gifs") {
          let response = await fetchGIF(query);
          if (!response || response.length === 0) {
            throw new Error("No GIFs found");
          }
          data = response.map((gif) => ({
            id: gif.id,
            type: "gif",
            title: gif.title || "GIF",
            thumbnail: gif.media_formats.tinygif.url,
            src: gif.media_formats.gif.url,
          }));
        }

        dispatch(setResults(data));
      } catch (err) {
        console.error("Error in getData:", err);
        dispatch(setError(err.message || "Something went wrong"));
      }
    };

    getData();
  }, [query, activeTab, dispatch]);

  if (loading) {
    return (
      <div className="min-h-fit bg-gray-900 flex justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-xl text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-fit bg-gray-900 flex justify-center p-4">
        <div className="text-center bg-red-900/30 border border-red-500 h-fit rounded-lg p-8 w-100 max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error</h2>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  // If query exists but no results
  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl">No results found for "{query}"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {results.map((item) => (
          <ResultCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ResultGrid;
