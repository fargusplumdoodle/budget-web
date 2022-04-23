import { toCents } from "../../../api/util";
import { Budget, Tag } from "../../../store/types/models";
import { Operand } from "../types";
import { INPUTS } from "./inputs";
import {
  numericalOperators,
  textOperators,
  listOperators,
  OPERATORS,
} from "./operators";

export const OPERANDS: { [name: string]: Operand<any> } = {
  amount: {
    name: "amount",
    label: "Amount",
    operators: numericalOperators,

    input: INPUTS.currency,
    transformValue: (amount: number) => [toCents(amount).toString()],
    requiresSetValueAndExpression: false,
    inputLabel: (amount: number) => amount.toString(),
  },
  description: {
    name: "description",
    label: "Description",
    operators: textOperators,

    input: INPUTS.text,
    requiresSetValueAndExpression: false,
    inputLabel: (description: string) => description,
  },
  date: {
    name: "date",
    label: "Date",
    operators: numericalOperators,

    input: INPUTS.date,
    requiresSetValueAndExpression: true,
    transformValue: (date: Date) => [date.toLocaleDateString()],
    inputLabel: (date: Date) => date.toLocaleDateString(),
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
    inputLabel: (tags: Tag[]) => {
      return tags.map((t) => t.name).join(", ");
    },
  },

  tags__none: {
    name: "tags",
    label: "No Tags",

    operators: [OPERATORS.none],
    input: INPUTS.impliedTrue,
    requiresSetValueAndExpression: false,
    transformValue: () => {
      return ["true"];
    },
    inputLabel: () => "",
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
    inputLabel: (budgets: Budget[]) => {
      return budgets.map((b) => b.name).join(", ");
    },
  },
};
