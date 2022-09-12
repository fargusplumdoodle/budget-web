import { Tag } from "../models/types";
import { LOAD_TAGS_SUCCESS } from "./actionTypes";
import { AppDispatch } from "../configureStore";
import { updateStatus } from "./apiStatusActions";
import api from "../../api";

export function loadTagsSuccess(tags: Tag[]) {
  return {
    type: LOAD_TAGS_SUCCESS,
    payload: tags,
  };
}

export function fetchTags() {
  return async (dispatch: AppDispatch) => {
    dispatch(updateStatus("TAGS", "loading"));
    api.tag
      .receiveTags()
      .then((tags: Tag[]) => {
        dispatch(loadTagsSuccess(tags));
      })
      .catch((err) => {
        dispatch(updateStatus("TAGS", "error"));
        throw err;
      });
  };
}
