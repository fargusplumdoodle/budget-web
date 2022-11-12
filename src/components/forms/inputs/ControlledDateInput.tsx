import * as React from "react";
import { Control, Controller, Path } from "react-hook-form";
import { SxProps, TextField } from "@mui/material";
import settings from "../../../app/settings";
import { DatePicker } from "@mui/x-date-pickers";

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
          renderInput={(params: any) => <TextField sx={sx} {...params} />}
          {...props}
          {...field}
        />
      )}
    />
  );
}

export default ControlledDateInput;
