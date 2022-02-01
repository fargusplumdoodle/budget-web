import * as React from "react";
import { Control, Controller, Path } from "react-hook-form";
import { FormHelperText, Input, InputAdornment, SxProps } from "@mui/material";
import { InputErrorMessage } from "../types";

interface Props<FormT> {
  name: Path<FormT>;
  control: Control<FormT, object>;
  errors: InputErrorMessage;
  showError: boolean;
  sx?: SxProps;
}

function AmountInput<FormT>({
  name,
  control,
  errors,
  sx,
  showError,
}: Props<FormT>) {
  const sxOptions = { width: "100%", marginRight: 1, ...sx };
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            error={Boolean(errors)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            sx={{ ...sxOptions }}
            {...field}
          />
        )}
      />
      {errors && showError ? (
        <FormHelperText error={Boolean(errors)}>
          {errors.message}
        </FormHelperText>
      ) : null}
    </>
  );
}

export default AmountInput;
