import { Tag, Transaction } from "../store/models/types";
import { modelById, modelByName } from "../store/models/utils";
import transactions from "./transactions";

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
};

export default tags;