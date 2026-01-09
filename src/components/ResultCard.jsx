import React, { useState } from "react";
import { addToCollection } from "../app/features/collectionSlice";
import { useDispatch } from "react-redux";
import { downloadMedia } from "../utils/downloadMedia";
import { toast } from "react-toastify";

const ResultCard = ({ item }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = (e) => {
    e.stopPropagation();
    dispatch(addToCollection(item));
  };

  const handleDownload = async (e) => {
    e.stopPropagation();
    setIsDownloading(true);

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
      setIsDownloading(false);
    }
  };

  return (
    <>
      {/* Card */}
      <div
        className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-105 shadow-md hover:shadow-xl bg-white"
        onClick={openModal}
      >
        <img
          src={item.thumbnail}
          alt={item.title || "Media thumbnail"}
          className="w-full h-64 object-cover"
        />

        {/* Button Container */}
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          {/* Save Button */}
          <button
            className="bg-emerald-600 text-white px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 cursor-pointer text-sm font-semibold hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all duration-200"
            onClick={handleSave}
          >
            Save
          </button>

          {/* Download Button */}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 cursor-pointer text-sm font-semibold hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>...</span>
              </>
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
                <span>Download</span>
              </>
            )}
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

      {/* Modal for full view */}
      {isModalOpen && (
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
              onClick={handleDownload}
              disabled={isDownloading}
              className="absolute top-4 left-4 text-white text-sm bg-blue-600 backdrop-blur-md rounded-md px-4 py-2 flex items-center gap-2 hover:bg-blue-700 transition-all duration-200 z-10"
            >
              {isDownloading ? (
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
            {item.type === "video" ? (
              <video
                src={item.src}
                controls
                autoPlay
                className="max-w-full max-h-[90vh] rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={item.src}
                alt={item.title || "Full size media"}
                className="max-w-full max-h-[90vh] rounded-lg object-contain"
              />
            )}

            {/* Title below media */}
            {item.title && (
              <p className="text-white capitalize text-center mt-4 text-lg font-medium">
                {item.title}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ResultCard;