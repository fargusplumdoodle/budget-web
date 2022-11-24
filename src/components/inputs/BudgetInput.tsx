import React, { FunctionComponent } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import capitalize from "lodash/capitalize";
import { Budget, selectBudgetList } from "../../store";

interface Props {
  name?: string;
  budgetFilter?: (budget: Budget) => boolean;
  disabled?: boolean;
  label?: string;
}

const BudgetInput: FunctionComponent<Props> = ({
  name = "budget",
  budgetFilter,
  disabled = false,
  label = "Budgets",
}) => {
  const {
    formState: { errors },
  } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name });

  const budgets = useSelector(selectBudgetList);
  const budgetOptions = budgetFilter ? budgets.filter(budgetFilter) : budgets;

  return (
    <Grid container wrap="nowrap" gap={1}>
      <Grid
        item
        xs
        component={Autocomplete}
        disablePortal
        value={value}
        disableClearable
        // @ts-ignore
        onChange={(_: any, value: Budget) => onChange(value)}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label={label}
            fullWidth
            error={!!errors.message}
            helperText={errors ? errors.message : ""}
            placeholder={label}
          />
        )}
        disabled={disabled}
        options={budgetOptions}
        getOptionLabel={(budget: Budget) => capitalize((budget as Budget).name)}
        isOptionEqualToValue={(option: Budget, budget: Budget) =>
          option.id === budget.id
        }
      />
    </Grid>
  );
};

export default BudgetInput;
