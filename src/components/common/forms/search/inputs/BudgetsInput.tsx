import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Budget } from "../../../../store/types/models";
import { store } from "../../../../store/configureStore";
import { Expression } from "../search/types";

interface Props {
  expression: Expression;
  setValue: (id: string, value: any) => void;
  [k: string]: any;
}

class BudgetsInput extends React.Component<Props, {}> {
  render() {
    const state = store.getState();
    const props = { ...this.props };
    delete props["expression"];
    delete props["setValue"];
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
          <TextField
            {...params}
            variant="standard"
            label="Budgets"
            placeholder="Budgets"
          />
        )}
        {...props}
        onChange={(e, budgets) => {
          this.props.setValue(this.props.expression.id.toString(), budgets);
        }}
      />
    );
  }
}

export default BudgetsInput;
