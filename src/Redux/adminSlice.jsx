import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isloggedIn: false,
  },
  reducers: {
    adminLogin: (state) => {
      state.isloggedIn = true;
    },
    adminLogout: (state) => {
      state.isloggedIn = false;
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
