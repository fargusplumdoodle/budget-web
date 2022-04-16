import * as React from "react";
import { Input, InputAdornment } from "@mui/material";
import { DateInput } from "../../forms/search/inputs";
import BudgetsInput from "../../forms/search/inputs/BudgetsInput";
import TagsInput from "../../forms/search/inputs/TagsInput";

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
