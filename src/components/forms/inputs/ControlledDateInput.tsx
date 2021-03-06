import * as React from "react";
import { Control, Controller, Path } from "react-hook-form";
import { SxProps, TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import settings from "../../../app/settings";

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
        // @ts-ignore
        <DatePicker
          label="Date"
          openTo="day"
          minDate={settings.minDate}
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
