import { createSlice } from "@reduxjs/toolkit";

// Interfaces
import { IAuth, IUser } from "../interfaces";
import { AppState } from "../store";

const initialState: IAuth = {
  logged: false,
  user: {
    id: 0,
    name: "",
    lastname: "",
    email: "",
    hierarchy: "",
  },
};

const authSlice = createSlice({
  name: "[AUTH]",
  initialState,
  reducers: {
    login: (state: IAuth) => {
      state.logged = true;
    },
    logout: (state: IAuth) => {
      state.logged = false;
      state.user = {
        id: 0,
        name: "",
        lastname: "",
        email: "",
        hierarchy: "",
      };
    },
    setUser: (state: IAuth, action: { payload: IUser }) => {
      state.user = action.payload;
    },
  },
});

export { authSlice };

// Actions
export const { login, logout, setUser } = authSlice.actions;

// Selector to access to the store
export const selectAuth = (state: AppState) => state.auth;

export default authSlice.reducer;
