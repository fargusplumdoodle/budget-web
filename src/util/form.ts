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

export const budgetSchema = yup.object({
  name: yup.string().max(20).required(),
  percentage: yup.number().positive().integer(),
});

export const transactionSchema = yup
  .object({
    tags: yup.array().min(1).required(),
    amount: yup.number().required(),
    description: yup.string().max(300),
    date: yup.date().required(),
    budget: yup.object().required(),
  })
  .required();

export const tagSchema = yup.object({
  name: yup
    .string()
    .max(30)
    .test("name is unique", "Tag Name must be unique", (value) => {
      const state = store.getState();
      return !Boolean(state.tags.byName[value]);
    })
    .required(),
});
