import * as React from "react";
import { Control, Controller, Path } from "react-hook-form";
import { TextField } from "@mui/material";
import { InputErrorMessage } from "../types";

interface Props<FormT> {
  name: Path<FormT>;
  control: Control<FormT, object>;
  errors: InputErrorMessage;
}

function ControlledDescriptionInput<FormT>({
  name,
  control,
  errors,
}: Props<FormT>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          label="Description"
          error={Boolean(errors)}
          helperText={errors ? errors.message : ""}
          placeholder="Description"
          sx={{ width: "100%" }}
          {...field}
        />
      )}
    />
  );
}

export default ControlledDescriptionInput;
