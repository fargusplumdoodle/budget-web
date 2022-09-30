import initialState from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { StateStatus, TagState } from "../types/stateTypes";
import {
  LOAD_TAGS_SUCCESS,
  CLEAR_AUTH_TOKEN,
  UPDATE_TAGS_STATUS,
} from "../actions/actionTypes";
import { Tag } from "../models/types";
import { orderBy } from "lodash";

export default function tagReducer(
  state: TagState = initialState.tags,
  action: PayloadAction<Tag[] | StateStatus>
): TagState {
  switch (action.type) {
    case LOAD_TAGS_SUCCESS:
      const tags = [
        ...state.list,
        ...(action.payload as Tag[]).filter(
          (tag: Tag) => !state.byName[tag.name] && !state.byId[tag.id!]
        ),
      ];
      return {
        status: "loaded",
        list: orderBy(tags, ["rank"], ["desc"]),
        byName: Object.fromEntries(tags.map((tag) => [tag.name, tag])),
        byId: Object.fromEntries(tags.map((tag) => [tag.id, tag])),
      };
    case UPDATE_TAGS_STATUS:
      return { ...state, status: action.payload as StateStatus };
    case CLEAR_AUTH_TOKEN:
      return { ...initialState.tags };
    default:
      return state;
  }
}
