import { RootState } from "../types";
import { DataState } from "./types";

export const selectDataState = (state: RootState): DataState => state.data;
