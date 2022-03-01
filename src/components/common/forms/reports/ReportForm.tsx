import { Search } from "@mui/icons-material";
import { Box, IconButton, SxProps, TextField } from "@mui/material";
import { startCase } from "lodash";
import { DateTime } from "luxon";
import * as React from "react";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { timeBuckets, TimeBucketSize } from "../../../../api/types";
import { Classes } from "../../../../util/types";
import ControlledAutocomplete from "../inputs/ControlledAutoComplete";
import ControlledDateInput from "../inputs/ControlledDateInput";

const classes: Classes = {
  root: {},
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 1,
    p: 1,
  },
};

interface ReportFormProps {
  hideTimebucketSelector?: boolean;
  hideDateLte?: boolean;

  defaultTimebucketSize: TimeBucketSize;
  defaultDateGte: DateTime;

  sx?: SxProps;
  onSubmit: (
    timeBucketSize: TimeBucketSize,
    date__gte: Date,
    date__lte: Date
  ) => void;
}

interface FormData {
  date__lte: Date;
  date__gte: Date;
  timeBucketSize: TimeBucketSize;
}

const ReportForm: FunctionComponent<ReportFormProps> = ({
  hideDateLte,
  hideTimebucketSelector,
  defaultTimebucketSize,
  defaultDateGte,
  onSubmit,
  sx,
}) => {
  const initialState: FormData = {
    timeBucketSize: defaultTimebucketSize,
    date__lte: DateTime.now().toJSDate(),
    date__gte: defaultDateGte.toJSDate(),
  };

  const { control, handleSubmit, getValues } = useForm<FormData>({
    defaultValues: {
      ...initialState,
    },
  });

  return (
    <Box sx={sx}>
      <form
        onSubmit={handleSubmit(
          ({ date__gte, date__lte, timeBucketSize }: FormData) =>
            onSubmit(timeBucketSize, date__gte, date__lte)
        )}
      >
        <Box sx={classes.form}>
          <ControlledDateInput
            label="From"
            control={control}
            name="date__gte"
          />
          {!hideDateLte && (
            <ControlledDateInput
              label="To"
              control={control}
              name="date__lte"
            />
          )}

          {!hideTimebucketSelector && (
            <ControlledAutocomplete<TimeBucketSize, FormData>
              control={control}
              name="timeBucketSize"
              options={timeBuckets}
              getValues={getValues}
              getOptionLabel={(option) => startCase(option)}
              sx={{ width: 200 }}
              disableClearable
              renderInput={(params: any) => (
                <TextField {...params} variant="standard" label="Time Bucket" />
              )}
            />
          )}
          <IconButton type="submit"><Search/></IconButton>
        </Box>
      </form>
    </Box>
  );
};

export default ReportForm;
