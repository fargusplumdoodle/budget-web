import { createSlice } from "@reduxjs/toolkit";
import {
  addModelsToList,
  addModelToList,
  allObjectsExcept,
  modelById,
  modelByName,
} from "../../models/utils";
import { Tag, TagState } from "./types";

export const initialState: TagState = {
  list: [],
  byName: {},
  byId: {},
  lastFetch: null,
};

export const sliceKey = "tag";
const tagSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    loadTags(state: TagState, action) {
      const tags = [...(action.payload as Tag[])];
      state.list = addModelsToList(state.list, tags);
      state.byName = modelByName(state.list);
      state.byId = modelById(state.list);
    },
    loadTag(state: TagState, { payload }) {
      const tag: Tag = payload;
      state.list = addModelToList(state.list, tag);
      state.byId[tag.id!] = tag;
      state.byName[tag.name] = tag;
    },
    createTag(state, _) {
      return state;
    },
    deleteTag(state, { payload }) {
      const tag: Tag = payload;
      state.list = [...state.list.filter(allObjectsExcept(tag.id!))];
      delete state.byId[tag.id!];
      delete state.byName[tag.name];
    },
    updateTag(state, _) {
      return state;
    },
    fetchAllTags(state, _) {
      state.lastFetch = new Date().toISOString();
    },
  },
});
export const {
  loadTags,
  loadTag,
  deleteTag,
  createTag,
  updateTag,
  fetchAllTags,
} = tagSlice.actions;
export default tagSlice.reducer;
