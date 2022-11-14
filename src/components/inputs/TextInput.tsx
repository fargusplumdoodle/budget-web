import React, { FunctionComponent } from "react";
import { FormHelperText, Grid, TextField } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import capitalize from "lodash/capitalize";

interface Props {
  fieldName: string;
  label: string;
}

const TextInput: FunctionComponent<Props> = ({ fieldName, label }) => {
  const {
    formState: { errors },
  } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name: fieldName });
  console.log("text input", { value, errors });

  return (
    <>
      <Grid container wrap="nowrap" gap={1}>
        <TextField
          fullWidth
          label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Grid>
      {!!errors.tags && (
        <FormHelperText error>
          {capitalize((errors[fieldName]?.message as string) || "")}
        </FormHelperText>
      )}
    </>
  );
};

export default TextInput;
