import { Input } from "@mui/material";
import { Operand, Operator } from "./types";

// TODO: THIS
export const INPUTS = {
  numerical: Input,
  text: Input,
};

export const OPERATORS: { [name: string]: Operator } = {
  greaterThan: {
    name: ">",
    djangoExpression: "__gt",
    input: INPUTS.numerical,
  },
  lessThan: {
    name: "<",
    djangoExpression: "__lt",
    input: INPUTS.numerical,
  },
  lessThanEqual: {
    name: "<=",
    djangoExpression: "__lte",
    input: INPUTS.numerical,
  },
  greaterThanEqual: {
    name: ">=",
    djangoExpression: "__gte",
    input: INPUTS.numerical,
  },
  equal: {
    name: "==",
    djangoExpression: "",
    input: INPUTS.numerical,
  },
  icontains: {
    name: "icontains",
    djangoExpression: "__icontains",
    input: INPUTS.text,
  },
  iexact: {
    name: "iexact",
    djangoExpression: "__iexact",
    input: INPUTS.text,
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
  },
  budget__balance: {
    name: "budget__balance",
    label: "Budget Balance",
    operators: numericalOperators,
  },
  description: {
    name: "description",
    label: "Description",
    operators: textOperators,
  },
};
