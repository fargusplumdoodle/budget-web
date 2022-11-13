import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Autocomplete,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import capitalize from "lodash/capitalize";
import { TimeBuckets } from "../../api/report";
import { Budget } from "../../store";
import { adaptMonthlyValue, valueToMonthly } from "../../reports";

interface Props {
  fieldName?: string;
}

type AllocationPeriods =
  | TimeBuckets.ONE_MONTH
  | TimeBuckets.THREE_MONTHS
  | TimeBuckets.ONE_YEAR;

const AllocationPeriodOptions = {
  [TimeBuckets.ONE_MONTH]: { label: "Month", value: TimeBuckets.ONE_MONTH },
  [TimeBuckets.THREE_MONTHS]: {
    label: "Quarter",
    value: TimeBuckets.THREE_MONTHS,
  },
  [TimeBuckets.ONE_YEAR]: { label: "Year", value: TimeBuckets.ONE_YEAR },
};

const AllocationInput: FunctionComponent<Props> = ({
  fieldName = "monthlyAllocation",
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  const {
    field: { value, onChange: onChangeProp },
  } = useController({ name: fieldName });

  const [textInput, setTextInput] = useState<string>(
    Math.abs(value).toString()
  );
  const [allocationPeriod, setAllocationPeriod] = useState<AllocationPeriods>(
    TimeBuckets.ONE_MONTH
  );

  const getValue = (initialValue: string): number => {
    return parseFloat(initialValue);
  };

  const onChange = ({
    inputValue = textInput,
    allocationPeriodValue = allocationPeriod,
  }) => {
    const newValue = getValue(inputValue);
    const monthlyValue = valueToMonthly(newValue, allocationPeriodValue);
    onChangeProp(monthlyValue);
    console.log({ newValue, monthlyValue });
  };

  const handleAllocationPeriodChange = (
    newAllocationPeriod: AllocationPeriods
  ) => {
    setAllocationPeriod(newAllocationPeriod);
    onChange({ allocationPeriodValue: newAllocationPeriod });
  };

  return (
    <>
      <Grid container wrap="nowrap" gap={1}>
        <Grid item xs>
          <TextField
            type="number"
            fullWidth
            sx={{
              "& input": {
                MozAppearance: "textfield",
                "&::WebkitOuterSpinButton, &::WebkitInnerSpinButton": {
                  WebkitAppearance: "none",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            label="Allocate"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onBlur={() => onChange({})}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            fullWidth
            disablePortal
            value={AllocationPeriodOptions[allocationPeriod]}
            disableClearable
            // @ts-ignore
            onChange={(_: any, option: any) =>
              handleAllocationPeriodChange(option.value)
            }
            renderInput={(params: any) => (
              <TextField
                {...params}
                label="Per"
                fullWidth
                error={!!errors.message}
                helperText={errors ? errors.message : ""}
                placeholder="Per"
              />
            )}
            options={Object.values(AllocationPeriodOptions)}
          />
        </Grid>
      </Grid>
      {!!errors.tags && (
        <FormHelperText error>
          {capitalize(errors[fieldName]?.message as string)}
        </FormHelperText>
      )}
    </>
  );
};

export default AllocationInput;
