import initialState from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { TagState } from "../types/stateTypes";
import { authActionTypes, tagActionTypes } from "../actions/actionTypes";
import { Tag } from "../types/models";
import { orderBy } from "lodash";

export default function tagReducer(
  state: TagState = initialState.tags,
  action: PayloadAction<Tag[]>
): TagState {
  switch (action.type) {
    case tagActionTypes.LOAD_TAGS_SUCCESS:
      const tags = [
        ...state.list,
        ...action.payload.filter(
          (tag: Tag) => !state.byName[tag.name] && !state.byId[tag.id]
        ),
      ];
      return {
        list: orderBy(tags, ["rank"], ["desc"]),
        byName: Object.fromEntries(tags.map((tag) => [tag.name, tag])),
        byId: Object.fromEntries(tags.map((tag) => [tag.id, tag])),
      };
    case authActionTypes.CLEAR_AUTH_TOKEN:
      return { ...initialState.tags };
    default:
      return state;
  }
}
