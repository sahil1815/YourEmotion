import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const TENOR_KEY = import.meta.env.VITE_TENOR_KEY;
const PEXEL_KEY = import.meta.env.VITE_PEXEL_KEY;

export const fetchPhotos = async (query, page = 1, per_page = 150) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query, page, per_page },
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
  });
  const data = response.data.results;
  return data;
};

export const fetchVideos = async (query, per_page = 75) => {
  const response = await axios.get("https://api.pexels.com/videos/search", {
    params: { query, per_page },
    headers: { Authorization: PEXEL_KEY },
  });
  const data = response.data.videos;
  return data;
};

export const fetchGIF = async (query, limit=150) => {
  const response = await axios.get("https://tenor.googleapis.com/v2/search", {
    params: { q: query, key: TENOR_KEY, limit },
  });
  const data = response.data.results;
  return data;
};
