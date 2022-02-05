import * as React from "react";
import { Control, Controller, Path } from "react-hook-form";
import { SxProps, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

interface Props<FormT> {
  name: Path<FormT>;
  control: Control<FormT, object>;
  sx?: SxProps;
  [x: string]: any;
}
// TODO: FIX DATE OFF BY ONE ISSUE

function DateInput<FormT>({ name, control, sx, ...props }: Props<FormT>) {
  const styles = sx ? sx : { width: "100%" };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            openTo="day"
            views={["year", "month", "day"]}
            renderInput={(params) => (
              <TextField variant="standard" sx={styles} {...params} />
            )}
            {...props}
            {...field}
          />
        </LocalizationProvider>
      )}
    />
  );
}

export default DateInput;
