import { Budget } from "../store/types/models";
import { makeRequest } from "./util";
import {SerializedBudget} from "./types";
import {deserializeBudget} from "../util/serializers";

export async function receiveBudgets(): Promise<Budget[]> {
  const r = await makeRequest({
    method: "get",
    url: "/api/v2/budget/",
  });

  return r.data.map((budget: SerializedBudget) => deserializeBudget(budget));
}
