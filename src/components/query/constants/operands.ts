import { Checkbox } from "@mui/material";
import { toCents } from "../../../api/util";
import BudgetsInput from "../inputs/BudgetsInput";
import CurrencyInput from "../inputs/DescriptionInput";
import DateInput from "../inputs/DateInput";
import TagsInput from "../inputs/TagsInput";
import { Operand } from "../types";
import {
  numericalOperators,
  textOperators,
  listOperators,
  OPERATORS,
} from "./operators";
import DescriptionInput from "../inputs/DescriptionInput";
import { Budget } from "../../../store/data/budgets/types";
import { Tag } from "../../../store/data/tags";

export const OPERANDS: { [name: string]: Operand<any> } = {
  amount: {
    name: "amount",
    label: "Amount",
    operators: numericalOperators,
    input: CurrencyInput,
    transformValue: (amount: number) => [toCents(amount).toString()],
    requiresSetValueAndExpression: false,
    inputLabel: (amount: number) => amount.toString(),
    getDefaultValue: () => 0,
  },
  description: {
    name: "description",
    label: "Description",
    operators: textOperators,

    input: DescriptionInput,
    requiresSetValueAndExpression: false,
    inputLabel: (description: string) => description,
    getDefaultValue: () => "",
  },
  date: {
    name: "date",
    label: "Date",
    operators: numericalOperators,

    input: DateInput,
    requiresSetValueAndExpression: true,
    transformValue: (date: Date) => [date.toLocaleDateString()],
    inputLabel: (date: Date) => date.toLocaleDateString(),
    getDefaultValue: () => new Date(),
  },
  tags: {
    name: "tags",
    label: "Tags",
    operators: listOperators,

    input: TagsInput,
    requiresSetValueAndExpression: true,
    transformValue: (tags: Tag[]) => {
      return tags.map((t) => t.name);
    },
    inputLabel: (tags: Tag[]) => {
      return tags.map((t) => t.name).join(", ");
    },
    getDefaultValue: () => [],
  },

  tags__none: {
    name: "tags",
    label: "No Tags",

    operators: [OPERATORS.none],
    input: Checkbox,
    requiresSetValueAndExpression: false,
    transformValue: () => ["true"],
    inputLabel: () => "",
    getDefaultValue: () => true,
  },

  budgets: {
    name: "budget",
    label: "Budgets",

    operators: listOperators,
    input: BudgetsInput,
    requiresSetValueAndExpression: true,
    transformValue: (budgets: Budget[]) => {
      return budgets.map((b) => b.id!.toString());
    },
    inputLabel: (budgets: Budget[]) => {
      return budgets.map((b) => b.name).join(", ");
    },
    getDefaultValue: () => [],
  },
};
