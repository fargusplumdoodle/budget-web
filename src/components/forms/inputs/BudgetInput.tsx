import React, { FunctionComponent } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/configureStore";
import capitalize from "lodash/capitalize";
import { Budget } from "../../../store/data/budgets/types";

interface Props {}

const BudgetInput: FunctionComponent<Props> = () => {
  const {
    formState: { errors },
  } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name: "budget" });
  const budgets = useSelector(selectBudgetList);

  return (
    <>
      <Grid container wrap="nowrap" gap={1}>
        <Grid
          item
          xs
          component={Autocomplete}
          disablePortal
          value={value}
          disableClearable
          onChange={(_: any, value: Budget) => onChange(value)}
          renderInput={(params: any) => (
            <TextField
              {...params}
              label="Budgets"
              fullWidth
              error={!!errors.message}
              helperText={errors ? errors.message : ""}
              placeholder="Budgets"
            />
          )}
          options={budgets}
          getOptionLabel={(budget: Budget) =>
            capitalize((budget as Budget).name)
          }
          isOptionEqualToValue={(option: Budget, budget: Budget) =>
            option.id === budget.id
          }
        />
      </Grid>
    </>
  );
};

export default BudgetInput;
