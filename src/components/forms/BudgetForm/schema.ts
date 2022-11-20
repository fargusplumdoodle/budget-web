import * as yup from "yup";
import { selectBudgetByName, store } from "../../../store";

export const budgetFormSchema = yup
  .object({
    name: yup.string().max(20).required(),
    monthlyAllocation: yup.number().integer().required(),
    parent: yup.object().required(),
  })
  .required();
