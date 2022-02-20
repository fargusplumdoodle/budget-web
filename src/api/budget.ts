import { Budget } from "../store/types/models";
import { makeRequest } from "./util";
import { SerializedBudget } from "./types";
import { deserializeBudget, serializeBudget } from "./serializers";
import { store } from "../store/configureStore";
import { updateBudgetSuccess } from "../store/actions/budgetActions";

export async function receiveBudgets(): Promise<Budget[]> {
  const r = await makeRequest({
    method: "get",
    url: "/api/v2/budget/",
  });

  return r.data.map((budget: SerializedBudget) => deserializeBudget(budget));
}

export async function updateBudget(budget: Budget): Promise<Budget> {
  const r = await makeRequest({
    method: "put",
    url: `/api/v2/budget/${budget.id}/`,
    data: serializeBudget(budget),
  });
  const updatedBudget = deserializeBudget(r.data as SerializedBudget);
  store.dispatch(updateBudgetSuccess(updatedBudget));

  return updatedBudget;
}
