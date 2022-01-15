import * as yup from "yup";

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

export const budgetSchema = yup.object({
  id: yup.number().positive().integer(),
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
