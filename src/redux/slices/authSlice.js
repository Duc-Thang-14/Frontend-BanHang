import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  isAuthChecking: true, // 🔥 thêm cái này
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthChecking = false;
    },

    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    updateUser: (state, action) => {
      state.user = action.payload;
    },

    clearAuth: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthChecking = false;
    },

    setAuthChecking: (state, action) => {
      state.isAuthChecking = action.payload;
    },
  },
});

export const {
  setAuth,
  clearAuth,
  updateUser,
  updateAccessToken,
  setAuthChecking,
} = authSlice.actions;

export default authSlice.reducer;
