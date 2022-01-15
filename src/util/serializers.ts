import { Tag, Transaction } from "../store/types/models";
import { SerializedTag, SerializedTransaction } from "../api/types";
import { store } from "../store/configureStore";

export const serializeTag = (tag: Tag): SerializedTag => {
  return {
    name: tag.name,
  };
};
export const deserializeTag = (tag: SerializedTag): Tag => {
  return {
    id: tag.id,
    name: tag.name,
    rank: tag.rank,
  };
};

export function serializeTransaction(
  trans: Transaction
): SerializedTransaction {
  return {
    amount: trans.amount * 100,
    description: trans.description,
    budget: trans.budget.id,
    date: trans.date.toLocaleDateString(),
    income: trans.income,
    transfer: trans.transfer,
    tags: trans.tags.map((tag) => serializeTag(tag)),
  };
}

export function deserializeTransaction(
  trans: SerializedTransaction
): Transaction {
  const state = store.getState();
  return {
    ...trans,
    amount: trans.amount / 100,
    id: trans.id,
    date: new Date(trans.date),
    budget: state.budgets.byId[trans.budget],
    tags: trans.tags.map((tag) => deserializeTag(tag)),
  };
}
