import { Search } from "@mui/icons-material";
import { Box, IconButton, SxProps, TextField } from "@mui/material";
import { startCase } from "lodash";
import { DateTime } from "luxon";
import * as React from "react";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { timeBuckets, TimeBucketSize } from "../../../api/types";
import { Classes } from "../../../util/types";
import ControlledAutocomplete from "../../forms/inputs/ControlledAutoComplete";
import ControlledDateInput from "../../forms/inputs/ControlledDateInput";

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

export interface ReportFormData {
  date__lte: Date;
  date__gte: Date;
  time_bucket_size: TimeBucketSize;
}

interface ReportFormProps {
  hideTimebucketSelector?: boolean;
  hideDateLte?: boolean;

  defaultTimebucketSize: TimeBucketSize;
  defaultDateGte: DateTime;

  sx?: SxProps;
  onSubmit: (queryParams: URLSearchParams) => void;
}

const ReportForm: FunctionComponent<ReportFormProps> = ({
  hideDateLte,
  hideTimebucketSelector,
  defaultTimebucketSize,
  defaultDateGte,
  onSubmit,
  sx,
}) => {
  const initialState: ReportFormData = {
    time_bucket_size: defaultTimebucketSize,
    date__lte: DateTime.now().toJSDate(),
    date__gte: defaultDateGte.toJSDate(),
  };

  const { control, handleSubmit, getValues } = useForm<ReportFormData>({
    defaultValues: {
      ...initialState,
    },
  });

  return (
    <Box sx={sx}>
      <form
        onSubmit={handleSubmit(
          ({ date__gte, date__lte, time_bucket_size }: ReportFormData) =>
            onSubmit(
              new URLSearchParams({
                time_bucket_size,
                date__gte: date__gte.toLocaleDateString(),
                date__lte: date__lte.toLocaleDateString(),
              })
            )
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
            <ControlledAutocomplete<TimeBucketSize, ReportFormData>
              control={control}
              name="time_bucket_size"
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
          <IconButton type="submit">
            <Search />
          </IconButton>
        </Box>
      </form>
    </Box>
  );
};

export default ReportForm;
