import React, { FunctionComponent } from "react";
import { FormHelperText, Grid, TextField } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import capitalize from "lodash/capitalize";

interface Props {}

const DescriptionInput: FunctionComponent<Props> = () => {
  const {
    formState: { errors },
  } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name: "description" });

  return (
    <>
      <Grid container wrap="nowrap" gap={1}>
        <TextField
          fullWidth
          label="Description"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Grid>
      {!!errors.tags && (
        <FormHelperText error>
          {capitalize((errors.description?.message as string) || "")}
        </FormHelperText>
      )}
    </>
  );
};

export default DescriptionInput;
