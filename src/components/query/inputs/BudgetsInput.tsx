import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { ExpressionInputProps } from "../types";
import { selectBudgetList, store, Budget } from "../../../store";

interface Props extends ExpressionInputProps<Budget[]> {
  [k: string]: any;
}

const BudgetsInput: React.FunctionComponent<Props> = (props) => {
  const budgets = useSelector(selectBudgetList);
  return (
    <Autocomplete
      options={budgets}
      disablePortal
      multiple
      limitTags={2}
      disableClearable
      isOptionEqualToValue={(option: Budget, value: Budget) =>
        option.id === value.id
      }
      getOptionLabel={(option: Budget) => option.name}
      renderInput={(params: any) => (
        <TextField {...params} placeholder="Budgets" />
      )}
      {...props}
      onChange={(e, budgets) => {
        props.onChange(budgets);
      }}
    />
  );
};

export default BudgetsInput;
