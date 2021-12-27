import { Budget } from "../store/types/models";
import { makeRequest } from "./util";

export async function receiveBudgets(): Promise<Budget[]> {
  const r = await makeRequest({
    method: "get",
    url: "/api/v2/budget/",
  });

  return r.data;
}
