import {
  modelById, modelByName, Transaction, Tag,
} from '../store';
import transactions from './transactions';

const getTagsFromTransactions = (trans: Transaction[]): Tag[] => {
  const allTags = trans.reduce(
    (tags: Tag[], transaction) => [...tags, ...transaction.tags],
    [],
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
