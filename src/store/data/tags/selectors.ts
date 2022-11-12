import { differenceInHours, parseISO } from "date-fns";
import { RootState } from "../../types";

export const selectTagById = (id: number) => (state: RootState) =>
  state.data.tags.byId[id];

export const selectTagByName = (name: string) => (state: RootState) =>
  state.data.tags.byName[name];

export const selectTagList = (state: RootState) => state.data.tags.list;

export const selectTagsById = (state: RootState) => state.data.tags.byId;

export const selectTagsLastFetched = (state: RootState) =>
  state.data.tags.lastFetch;

export const selectTagFetchRequired = (state: RootState) => {
  const list = selectTagList(state);
  if (list.length === 0) return true;

  const lastFetched = selectTagsLastFetched(state);
  if (!lastFetched) return true;

  return differenceInHours(parseISO(lastFetched), new Date()) > 24;
};
