import { AuthState } from "./types";
import { RootState } from "../../types";

export const selectAuthState = (state: RootState): AuthState =>
  state.session.auth;
