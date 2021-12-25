import axios from "axios";
import { Transaction } from "../store/types/models";
import { store } from "../store/configureStore";

export async function receiveTransactions(): Promise<Transaction[]> {
  const r = await axios({
    method: "get",
    url: "/api/v2/transaction/",
  });
  const state = store.getState();

  const transactions = r.data.map((trans: any) => {
    return {
      ...trans,
      date: new Date(trans.date),
      budget_id: trans.budget,
      budget: state.budgets.byId[trans.budget],
    };
  });
  console.log("trans", transactions);

  return transactions;
}
