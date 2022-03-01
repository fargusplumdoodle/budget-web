import * as React from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import { Expression } from "../types";
import settings from "../../../../../app/settings";

interface Props {
  expression: Expression;
  setValue: (id: string, value: any) => void;
  [k: string]: any;
  value: Date;
}

class DateInput extends React.Component<Props, {}> {
  render() {
    return (
      <DatePicker
        label="Date"
        openTo="day"
        minDate={settings.minDate}
        maxDate={new Date()}
        views={["year", "month", "day"]}
        renderInput={(params) => <TextField variant="standard" {...params} />}
        {...this.props}
        onChange={(date) => {
          this.props.setValue(this.props.expression.id.toString(), date);
        }}
      />
    );
  }
}

export default DateInput;
