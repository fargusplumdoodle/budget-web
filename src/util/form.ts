import * as yup from "yup";
import { Box, styled } from "@mui/material";
import { store } from "../store/configureStore";

export interface Option<T> {
  label: String;
  value: T;
}
interface hasName {
  name: String;
}

export const getOption = <T extends hasName>(obj: T): Option<T> => {
  return { label: obj.name, value: obj };
};

export const FormItem = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

export const budgetSchema = yup
  .object({
    name: yup
      .string()
      .max(20)
      .test("name is unique", "Budget Name must be unique", (value) => {
        const state = store.getState();
        return !Boolean(state.budgets.byName[value!]);
      })
      .required(),
    percentage: yup.number().positive().integer(),
  })
  .required();

export const transactionSchema = yup
  .object({
    tags: yup.array().min(1).required(),
    amount: yup.number().min(0.01).required(),
    description: yup.string().max(300),
    date: yup.date().required(),
    budget: yup.object().required(),
    income: yup.boolean(),
    transfer: yup.boolean(),
  })
  .required();

export const transactionSearchSchema = yup
  .object({
    tags: yup.array().nullable(),
    amountMin: yup.number().nullable(),
    amountMax: yup.number().nullable(),
    description: yup.string().max(300).nullable(),
    dateMin: yup.date().required().nullable(),
    dateMax: yup.date().required().nullable(),
    budgets: yup.array().required().nullable(),
  })
  .required();

export const tagSchema = yup.object({
  name: yup
    .string()
    .max(30)
    .test("name is unique", "Tag Name must be unique", (value) => {
      const state = store.getState();
      return !Boolean(state.tags.byName[value!]);
    })
    .required(),
});

export const incomeSchema = yup
  .object({
    amount: yup.number().min(0.01).required(),
    description: yup.string().max(300),
    date: yup.date().required(),
  })
  .required();

export const transferSchema = yup
  .object({
    amount: yup.number().min(0.01).required(),
    description: yup.string().max(300),
    date: yup.date().required(),
    fromBudget: yup.object().required(),
    toBudget: yup.object().required(),
  })
  .required();

export const userInfoSchema = yup
  .object({
    expected_monthly_net_income: yup.number().min(0.01).required(),
  })
  .required();
