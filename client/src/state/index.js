import { createSlice } from "@reduxjs/toolkit";

// This state will be stored in our global state and it will be accessible throughout the application.
const initialState = {
  mode: "light",
  user: null,
  token: null, // Store all the auth information
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :( ");
      }
    },
  },
});
