import { createSlice } from "@reduxjs/toolkit";
import { toast, Bounce } from "react-toastify";

const initialState = {
  items: JSON.parse(localStorage.getItem("collection")) || [],
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addToCollection: (state, action) => {
      // Validate payload
      if (!action.payload || !action.payload.id) {
        console.error("Invalid payload: missing id");
        toast.error("Failed to add: Invalid item", {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });
        return;
      }

      const alreadyExists = state.items.find(
        (item) => item && item.id === action.payload.id
      );

      if (!alreadyExists) {
        state.items.push(action.payload);
        localStorage.setItem("collection", JSON.stringify(state.items));
        toast.success("Added to Collection", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        toast.info("Already in Collection", {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });
      }
    },

    removeFromCollection: (state, action) => {
      if (!action.payload || !action.payload.id) {
        console.error("Invalid payload: missing id");
        return;
      }

      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("collection", JSON.stringify(state.items));
      toast.error("Removed From Collection!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    },

    clearCollection: (state) => {
      state.items = [];
      localStorage.removeItem("collection");
      toast.info("Collection Cleared", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });
    },
  },
});

export const { addToCollection, removeFromCollection, clearCollection } =
  collectionSlice.actions;
export default collectionSlice.reducer;