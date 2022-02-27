import * as React from "react";
import { Control, Controller, Path } from "react-hook-form";
import { SxProps, TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";

interface Props<FormT> {
  name: Path<FormT>;
  control: Control<FormT, object>;
  sx?: SxProps;
  [x: string]: any;
}

function ControlledDateInput<FormT>({
  name,
  control,
  sx,
  ...props
}: Props<FormT>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          label="Date"
          openTo="day"
          views={["year", "month", "day"]}
          renderInput={(params) => (
            <TextField variant="standard" sx={sx} {...params} />
          )}
          {...props}
          {...field}
        />
      )}
    />
  );
}

export default ControlledDateInput;
