import { modelById, modelByName } from "../store";
import transactions from "./transactions";
import { Transaction } from "../store";
import { Tag } from "../store";

const getTagsFromTransactions = (trans: Transaction[]): Tag[] => {
  const allTags = trans.reduce(
    (tags: Tag[], transaction) => [...tags, ...transaction.tags],
    []
  );
  return Object.values(modelById(allTags));
};

const list = getTagsFromTransactions(transactions);
const byId = modelById(list);
const byName = modelByName(list);
const tags = {
  list,
  byId,
  byName,
  lastFetch: new Date().toISOString(),
};

export default tags;
