import { Input, InputAdornment } from "@mui/material";
import { Operand, Operator } from "./types";
import DateInput from "../inputs/DateInput";
import * as React from "react";
import { toCents } from "../../../../api/util";

export const INPUTS = {
  currency: {
    element: Input,
    props: {
      startAdornment: <InputAdornment position="start">$</InputAdornment>,
    },
  },
  numeric: {
    element: Input,
    props: {},
  },
  text: {
    element: Input,
    props: {},
  },
  date: { element: DateInput, props: {} },
};

export const OPERATORS: { [name: string]: Operator } = {
  greaterThan: {
    name: ">",
    djangoExpression: "__gt",
  },
  lessThan: {
    name: "<",
    djangoExpression: "__lt",
  },
  lessThanEqual: {
    name: "<=",
    djangoExpression: "__lte",
  },
  greaterThanEqual: {
    name: ">=",
    djangoExpression: "__gte",
  },
  equal: {
    name: "==",
    djangoExpression: "",
  },
  icontains: {
    name: "icontains",
    djangoExpression: "__icontains",
  },
  iexact: {
    name: "iexact",
    djangoExpression: "__iexact",
  },
};

const numericalOperators = [
  OPERATORS.greaterThan,
  OPERATORS.lessThan,
  OPERATORS.greaterThanEqual,
  OPERATORS.lessThanEqual,
  OPERATORS.equal,
];
const textOperators = [OPERATORS.icontains, OPERATORS.iexact];

export const OPERANDS: { [name: string]: Operand } = {
  amount: {
    name: "amount",
    label: "Amount",
    operators: numericalOperators,
    input: INPUTS.currency,
    transformValue: (x) => toCents(x).toString(),
  },
  budget__balance: {
    name: "budget__balance",
    label: "Budget Balance",
    operators: numericalOperators,
    input: INPUTS.currency,
    transformValue: (x) => toCents(x).toString(),
  },
  budget__name: {
    name: "budget__name",
    label: "Budget Name",
    operators: textOperators,
    input: INPUTS.text,
  },
  description: {
    name: "description",
    label: "Description",
    operators: textOperators,
    input: INPUTS.text,
  },
  date: {
    // TODO: FIX TO USE DATE INPUT
    name: "date",
    label: "Date",
    operators: numericalOperators,
    input: INPUTS.text,
  },
};
