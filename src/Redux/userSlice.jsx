import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    id: "",
    token: "",
  },
  reducers: {
    userLogin: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    userLogout: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.token = "";
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export const userReducer = userSlice.reducer;
