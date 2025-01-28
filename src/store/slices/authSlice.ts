import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/models";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  id: string | null;
  company_name: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("authToken"),
  isAuthenticated: !!localStorage.getItem("authToken"),
  user: null,
  id: null,
  company_name: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      const { token, user } = action.payload;
      console.log("user", user);
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      state.id = user.id;
      state.company_name = user.company_name || null;
      localStorage.setItem("authToken", token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.id = null;
      state.company_name = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.token;
