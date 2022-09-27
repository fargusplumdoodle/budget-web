import React, { FunctionComponent } from "react";
import {
  Grid,
  TextField,
} from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/lab";
import settings from "../../../app/settings";

interface Props {}

const DescriptionInput: FunctionComponent<Props> = () => {
  const {
    formState: { errors },
  } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name: "date" });

  return (
    <Grid container wrap="nowrap" gap={1}>
      <DatePicker
        label="Date"
        openTo="day"
        minDate={settings.minDate}
        views={["year", "month", "day"]}
        renderInput={(params) => <TextField {...params} />}
        value={value}
        onChange={onChange}
      />
    </Grid>
  );
};

export default DescriptionInput;
