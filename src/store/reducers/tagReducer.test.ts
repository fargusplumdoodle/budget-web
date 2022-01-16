import { generateTestTag } from "../../util/generators";
import { loadTagsSuccess } from "../actions/tagActions";
import tagReducer from "./tagReducer";
import initialState from "../initialState";
import { range, orderBy } from "lodash";
import { TagState } from "../types/stateTypes";
import { Tag } from "../types/models";

/*
Asserts that the expected tags form the appropriate tag state data structure
 */
function ensureStateIsSetForListOfTags(state: TagState, expectedTags: Tag[]) {
  expect(state.list).toStrictEqual(orderBy(expectedTags, ["rank"], ["desc"]));

  expectedTags.forEach((tag) => {
    expect(state.byName[tag.name]).toStrictEqual(tag);
    expect(state.byId[tag.id]).toStrictEqual(tag);
  });
}

describe("Test tag reducer", () => {
  test("that new tags are not added to the state", () => {
    // using rank to ensure they appear in the right order
    const tags = range(10, 0).map((rank) => generateTestTag({ rank: rank }));
    const tagsState = tagReducer(initialState.tags, loadTagsSuccess(tags));

    ensureStateIsSetForListOfTags(tagsState, tags);

    // Adding the same tags to the state should result in the same state
    const newState = tagReducer(tagsState, loadTagsSuccess(tags));

    expect(newState).toStrictEqual(tagsState);
  });

  test("tags are sorted by rank, regardless of input order", () => {
    const first = generateTestTag({ name: "first", rank: 2 });
    const second = generateTestTag({ name: "second", rank: 1 });

    const state = tagReducer(
      initialState.tags,
      loadTagsSuccess([second, first])
    );

    expect(state.list).toStrictEqual([first, second]);
  });
});
