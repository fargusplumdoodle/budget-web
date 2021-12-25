import axios from "axios";
import { Budget } from "../store/types/models";

export async function receiveBudgets(): Promise<Budget[]> {
  const r = await axios({
    method: "get",
    url: "/api/v2/budget/",
  });

  return r.data;
}
