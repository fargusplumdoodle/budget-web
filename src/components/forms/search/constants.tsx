import { Input, InputAdornment } from "@mui/material";
import { Operand, Operator } from "./types";
import * as React from "react";
import { toCents } from "../../../api/util";
import { Budget, Tag } from "../../../store/types/models";
import { TagsInput, BudgetsInput, DateInput } from "./inputs";

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
  tags: {
    element: TagsInput,
    props: {},
  },
  budgets: {
    element: BudgetsInput,
    props: {},
  },
  date: { element: DateInput, props: {} },
  impliedTrue: { element: false, props: {} },
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
  includes: {
    name: "includes",
    djangoExpression: "__includes",
  },
  excludes: {
    name: "excludes",
    djangoExpression: "__excludes",
  },
  none: {
    name: "none",
    djangoExpression: "__none",
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
const listOperators = [OPERATORS.includes, OPERATORS.excludes];

export const OPERANDS: { [name: string]: Operand } = {
  amount: {
    name: "amount",
    label: "Amount",
    operators: numericalOperators,
    input: INPUTS.currency,
    transformValue: (amount) => [toCents(amount).toString()],
    requiresSetValueAndExpression: false,
  },
  description: {
    name: "description",
    label: "Description",
    operators: textOperators,
    input: INPUTS.text,
    requiresSetValueAndExpression: false,
  },
  date: {
    name: "date",
    label: "Date",
    operators: numericalOperators,
    input: INPUTS.date,
    requiresSetValueAndExpression: true,
    transformValue: (date: Date) => [date.toLocaleDateString()],
  },
  tags: {
    name: "tags",
    label: "Tags",
    operators: listOperators,
    input: INPUTS.tags,
    requiresSetValueAndExpression: true,
    transformValue: (tags: Tag[]) => {
      return tags.map((t) => t.name);
    },
  },
  tags__none: {
    name: "tags",
    label: "No Tags",
    operators: [OPERATORS.none],
    input: INPUTS.impliedTrue,
    requiresSetValueAndExpression: false,
    transformValue: () => {
      return ['true'];
    },
  },
  budgets: {
    name: "budget",
    label: "Budgets",
    operators: listOperators,
    input: INPUTS.budgets,
    requiresSetValueAndExpression: true,
    transformValue: (budgets: Budget[]) => {
      return budgets.map((b) => b.id!.toString());
    },
  },
};
