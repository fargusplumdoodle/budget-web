import * as React from "react";
import { Control, Controller, Path } from "react-hook-form";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

interface Props<FormT> {
  name: Path<FormT>;
  control: Control<FormT, object>;
}
// TODO: FIX DATE OFF BY ONE ISSUE

function DateInput<FormT>({ name, control }: Props<FormT>) {
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
              <TextField
                variant="standard"
                sx={{ width: "100%" }}
                {...params}
              />
            )}
            {...field}
          />
        </LocalizationProvider>
      )}
    />
  );
}

export default DateInput;
