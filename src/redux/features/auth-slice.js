import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isAuth: false,
    username: "",
  },
  loginVisible: true,
  adminLoginpage: false,
  librarianLoginpage: false,
};
export const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action) => {
      return {
        value: {
          isAuth: true,
          username: action.payload,
        },
      };
    },
    loginButtonVisible: (state) => {
      state.loginVisible = !state.loginVisible;
    },
    adminLogin: (state) => {
      state.adminLoginpage = true;
    },
    adminLoginReset: (state) => {
      state.adminLoginpage = false;
    },
    librarianLoginReset: (state) => {
      state.librarianLoginpage = false;
    },
    librarianLogin: (state) => {
      state.librarianLoginpage = true;
    },
  },
});

export const {
  logIn,
  logOut,
  loginButtonVisible,
  adminLogin,
  librarianLogin,
  adminLoginReset,
  librarianLoginReset,
} = auth.actions;
export default auth.reducer;
