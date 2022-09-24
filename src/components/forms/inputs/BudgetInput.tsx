import React, { FunctionComponent } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { Budget } from "../../../store/models/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/configureStore";
import capitalize from "lodash/capitalize";

interface Props {}

const BudgetInput: FunctionComponent<Props> = () => {
  const {
    formState: { errors },
  } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name: "budget" });
  const budgets = useSelector((state: RootState) => state.budgets.list);

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
          onChange={(_, value) => onChange(value)}
          renderInput={(params) => (
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
          getOptionLabel={(budget) => capitalize((budget as Budget).name)}
          isOptionEqualToValue={(option, budget) =>
            (option as Budget).id === (budget as Budget).id
          }
        />
      </Grid>
    </>
  );
};

export default BudgetInput;
