import { Tag } from "../types/models";
import { tagActionTypes } from "./actionTypes";
import { AppDispatch } from "../configureStore";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as tagAPI from "../../api/tag";

export function loadTagsSuccess(tags: Tag[]) {
  return {
    type: tagActionTypes.LOAD_TAGS_SUCCESS,
    payload: tags,
  };
}

export function fetchTags() {
  return async (dispatch: AppDispatch) => {
    dispatch(beginApiCall());
    tagAPI
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
