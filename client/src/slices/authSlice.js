// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  otpStatus:  null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },
    setOtpStatus: (state, action) => {
      state.otpStatus = action.payload;
    },
    logout: (state, ) => {
      state.userInfo = null;
      state.otpStatus = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout, setOtpStatus, setUserId } =
  authSlice.actions;

export default authSlice.reducer;
