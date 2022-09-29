import { RootState } from "../configureStore";
import { AuthState } from "./types";

export const selectAuthState = (state: RootState): AuthState => state.auth;
