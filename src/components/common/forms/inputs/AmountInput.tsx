import * as React from "react";
import { Control, Controller, Path } from "react-hook-form";
import {
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  SxProps,
} from "@mui/material";
import { InputErrorMessage } from "../types";

interface Props<FormT> {
  name: Path<FormT>;
  control: Control<FormT, object>;
  errors: InputErrorMessage;
  showError: boolean;
  label?: string;
  sx?: SxProps;
}

function AmountInput<FormT>({
  name,
  control,
  errors,
  sx,
  showError,
  label,
}: Props<FormT>) {
  const sxOptions = { width: "100%", marginRight: 1, ...sx };
  const id = `amount-input-${name}`;
  return (
    <>
      {label ? <InputLabel htmlFor={id}>{label}</InputLabel> : null}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id={id}
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
