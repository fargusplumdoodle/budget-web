import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { store } from "../../../store/configureStore";
import { ExpressionInputProps } from "../types";
import { Budget } from "../../../store/data/budgets/types";

interface Props extends ExpressionInputProps<Budget[]> {
  [k: string]: any;
}

const BudgetsInput: React.FunctionComponent<Props> = (props) => {
  const state = store.getState();
  return (
    <Autocomplete
      options={state.budgets.list}
      disablePortal
      multiple
      limitTags={2}
      disableClearable
      isOptionEqualToValue={(option: Budget, value: Budget) => {
        return option.id === value.id;
      }}
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
