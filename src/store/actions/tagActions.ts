import { Tag } from "../types/models";
import { LOAD_TAGS_SUCCESS } from "./actionTypes";
import { AppDispatch } from "../configureStore";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import api from "../../api";

export function loadTagsSuccess(tags: Tag[]) {
  return {
    type: LOAD_TAGS_SUCCESS,
    payload: tags,
  };
}

export function fetchTags() {
  return async (dispatch: AppDispatch) => {
    dispatch(beginApiCall());
    api.tag
      .receiveTags()
      .then((tags: Tag[]) => {
        dispatch(loadTagsSuccess(tags));
      })
      .catch((err) => {
        dispatch(apiCallError());
        throw err;
      });
  };
}
