import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    phone: "",
    id: "",
    token: "",
    role: "",
  },
  reducers: {
    userLogin: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    updateToken: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
    userLogout: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.token = "";
      state.role = "";
    },
  },
});

const userReducer = userSlice.reducer;
export const { userLogin, userLogout, updateToken } = userSlice.actions;

export default userReducer;
