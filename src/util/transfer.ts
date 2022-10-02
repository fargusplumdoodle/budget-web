import { TransferFormData } from "../components/forms/transaction_legacy/TransferForm";
import { store } from "../store/configureStore";
import { Transaction } from "../store/data/transactions/types";

export function createTransferTransactions(
  formData: TransferFormData
): Transaction[] {
  const { amount, description, date, fromBudget, toBudget } = formData;
  const state = store.getState();
  const transferTag = state.tags.byName["transfer"];
  const sharedAttributes = {
    date,
    description,
    income: false,
    transfer: true,
    tags: [transferTag],
  };

  const fromTrans: Transaction = {
    id: null,
    amount: 0 - Math.abs(amount),
    budget: fromBudget,
    ...sharedAttributes,
  };
  const toTrans: Transaction = {
    id: null,
    amount: Math.abs(amount),
    budget: toBudget,
    ...sharedAttributes,
  };
  return [fromTrans, toTrans];
}
