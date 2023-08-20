import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isAuth: false,
    username: "",
  },
  loginVisible:true
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
    loginButtonVisible:(state)=>{
      state.loginVisible=!state.loginVisible
    }

  },
});

export const { logIn, logOut,loginButtonVisible } = auth.actions;
export default auth.reducer;
