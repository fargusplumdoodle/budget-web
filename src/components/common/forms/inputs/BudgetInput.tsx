import * as React from "react";
import { Control, Path } from "react-hook-form";
import { TextField } from "@mui/material";
import { InputErrorMessage } from "../types";
import ControlledAutocomplete from "./ControlledAutoComplete";
import { Budget } from "../../../../store/types/models";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore";

interface Props<FormT> {
  name: Path<FormT>;
  control: Control<FormT, object>;
  errors: InputErrorMessage;
  getValues: (path: string) => Budget;
  defaultValue?: Budget;
  options?: Budget[];
  multiple?: boolean;
}
function BudgetsInput<FormT>({
  name,
  control,
  getValues,
  errors,
  ...autoCompleteOptions
}: Props<FormT>) {
  const budgets = useSelector((state: RootState) => state.budgets);
  return (
    <ControlledAutocomplete<Budget, FormT>
      name={name}
      control={control}
      getValues={getValues}
      defaultValue={budgets.byName["food"]}
      disablePortal
      options={budgets.list}
      disableClearable
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id;
      }}
      getOptionLabel={(option: Budget) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Budget"
          error={Boolean(errors)}
          helperText={errors ? errors.message : ""}
        />
      )}
      {...autoCompleteOptions}
    />
  );
}

export default BudgetsInput;
