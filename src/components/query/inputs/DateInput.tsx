import * as React from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import settings from "../../../app/settings";
import { ExpressionInputProps } from "../types";

interface Props extends ExpressionInputProps<Date> {
  [k: string]: any;
}

const DateInput: React.FunctionComponent<Props> = (props) => {
  return (
    <DatePicker
      label="Date"
      openTo="day"
      minDate={settings.minDate}
      views={["year", "month", "day"]}
      renderInput={(params: any) => <TextField {...params} />}
      {...props}
      onChange={(date: any) => {
        if (date) {
          props.onChange(date);
        }
      }}
    />
  );
};

export default DateInput;
