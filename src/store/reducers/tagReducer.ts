import initialState from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { TagState } from "../types/stateTypes";
import { tagActionTypes } from "../actions/actionTypes";
import { Tag } from "../types/models";

export default function tagReducer(
  state: TagState = initialState.tags,
  action: PayloadAction<Tag[]>
): TagState {
  switch (action.type) {
    case tagActionTypes.LOAD_TAGS_SUCCESS:
      const tags = [
        ...state.list,
        ...action.payload.filter(
          (tag: Tag) => !Object.keys(state.byName).includes(tag.name)
        ),
      ];
      return {
        list: tags.sort((a, b) => {
          return a.rank + b.rank;
        }),
        byName: Object.fromEntries(tags.map((tag) => [tag.name, tag])),
        byId: Object.fromEntries(tags.map((tag) => [tag.id, tag])),
      };
    default:
      return state;
  }
}
