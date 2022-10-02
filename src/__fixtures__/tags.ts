import { modelById, modelByName } from "../store/models/utils";
import transactions from "./transactions";
import { Transaction } from "../store/data/transactions/types";
import {Tag} from "../store/data/tags";

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
