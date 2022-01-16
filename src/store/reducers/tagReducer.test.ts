import { store } from "../configureStore";
import { generateTestTag } from "../../util/generators";
import { loadTagsSuccess } from "../actions/tagActions";
import * as lodash from "lodash";

describe("Test tag reducer", () => {
  test("that new tags are not added to the state", () => {
    const tags = lodash.range(10).map((id) => generateTestTag());
    store.dispatch(loadTagsSuccess(tags));

    expect(store.getState().tags.list).toStrictEqual(tags);

    [...Array(10)].forEach(() => {
      store.dispatch(loadTagsSuccess(tags));
    });
    const newTags = [generateTestTag()];
    store.dispatch(loadTagsSuccess(newTags));

    expect(store.getState().tags.list).toStrictEqual(tags.concat(newTags));
  });
  test("tags are fetchable by id", () => {
    const tags = lodash.range(10).map(() => generateTestTag());

    store.dispatch(loadTagsSuccess(tags));
    const state = store.getState();

    tags.forEach((tag) => {
      expect(state.tags.byId[tag.id]).toStrictEqual(tag);
    });
  });
  test("tags are fetchable by name", () => {
    const tags = lodash.range(10).map(() => generateTestTag());

    store.dispatch(loadTagsSuccess(tags));
    const state = store.getState();

    tags.forEach((tag) => {
      expect(state.tags.byName[tag.name]).toStrictEqual(tag);
    });
  });
});
