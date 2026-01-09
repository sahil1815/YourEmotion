import React, { useState } from "react";
import {
  removeFromCollection,
  clearCollection,
} from "../app/features/collectionSlice";
import { downloadMedia } from "../utils/downloadMedia";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CollectionPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.collection);
  const [downloadingId, setDownloadingId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  const handleRemove = (e, item) => {
    e.stopPropagation();
    dispatch(removeFromCollection(item));
  };

  const handleClearCollection = () => {
    if (
      window.confirm("Are you sure you want to clear your entire collection?")
    ) {
      dispatch(clearCollection());
    }
  };

  const handleDownload = async (e, item) => {
    e.stopPropagation();
    setDownloadingId(item.id);

    try {
      const filename = item.title?.replace(/[^a-z0-9]/gi, "_") || "media";
      const result = await downloadMedia(item.src, filename, item.type);

      if (result.success) {
        toast.success("Downloaded successfully!", {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
        });
      } else {
        toast.error("Download failed. Try again.", {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Download failed. Try again.", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
    } finally {
      setDownloadingId(null);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center -mt-[32px] text-white">
          <h2 className="text-2xl font-bold mb-2">Your Emotion List is Empty</h2>
          <p className="text-gray-400">
            Start adding emotions to your collection!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-0 lg:px-6">
        <h1 className="text-lg font-semibold text-white">
          My Collection
        </h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 md:px-6 py-2 rounded-md transition-colors font-semibold text-sm md:text-base"
          onClick={handleClearCollection}
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id}>
            {/* Card */}
            <div
              className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-105 shadow-md hover:shadow-xl bg-white"
              onClick={() => openModal(item)}
            >
              <img
                src={item.thumbnail}
                alt={item.title || "Media thumbnail"}
                className="w-full h-64 object-cover"
              />

              {/* Button Container */}
              <div className="absolute top-2 inset-x-3 flex flex-row justify-between gap-10 z-10">
                {/* Download Button */}
                <button
                  className="bg-blue-600 text-white px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 cursor-pointer text-xs font-semibold hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1"
                  onClick={(e) => handleDownload(e, item)}
                  disabled={downloadingId === item.id}
                >
                  {downloadingId === item.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      <span className="hidden sm:inline">Download</span>
                    </>
                  )}
                </button>

                {/* Remove button */}
                <button
                  className="bg-red-600 text-white px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 cursor-pointer text-xs font-semibold hover:bg-red-700 hover:scale-105 active:scale-95 transition-all duration-200"
                  onClick={(e) => handleRemove(e, item)}
                >
                  <span className="hidden sm:inline">Remove</span>
                  <span className="sm:hidden">✕</span>
                </button>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="p-4 w-[95%] text-white txtBackground w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-md font-semibold truncate capitalize">
                    {item.title || "Untitled"}
                  </p>
                  {item.type && (
                    <span className="text-xs uppercase text-gray-300">
                      {item.type}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for full view */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-7xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Download button in modal */}
            <button
              onClick={(e) => handleDownload(e, selectedItem)}
              disabled={downloadingId === selectedItem.id}
              className="absolute top-4 left-4 text-white text-sm bg-blue-600 backdrop-blur-md rounded-md px-4 py-2 flex items-center gap-2 hover:bg-blue-700 transition-all duration-200 z-10"
            >
              {downloadingId === selectedItem.id ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </>
              )}
            </button>

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-xl bg-black/70 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/90 hover:scale-110 transition-all duration-200 z-10"
            >
              ✕
            </button>

            {/* Media content */}
            {selectedItem.type === "video" ? (
              <video
                src={selectedItem.src}
                controls
                autoPlay
                className="max-w-full max-h-[90vh] rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            ) : selectedItem.type === "photo" ? (
              <img
                src={selectedItem.src}
                alt={selectedItem.title || "Full size media"}
                className="max-w-full max-h-[90vh] rounded-lg object-contain"
              />
            ) : (
              <img
                src={selectedItem.src}
                alt={selectedItem.title || "Full size media"}
                className="min-w-[400px] min-h-[400px] max-w-3xl max-h-[90vh] rounded-lg object-contain"
              />
            )}

            {/* Title below media */}
            {selectedItem.title && (
              <p className="text-white capitalize text-center mt-4 text-lg font-medium">
                {selectedItem.title}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
