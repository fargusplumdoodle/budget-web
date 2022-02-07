import * as React from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import { Ref } from "react";

interface Props {
  onChange: (date: Date) => void;
  value: Date;
}

// TODO: FIX THIS THING
const DateInput = React.forwardRef((props: Props, ref: Ref<HTMLDivElement>) => (
  <DatePicker
    ref={ref}
    label="Date"
    openTo="day"
    views={["year", "month", "day"]}
    renderInput={(params) => <TextField variant="standard" {...params} />}
    {...props}
  />
));

export default DateInput;
