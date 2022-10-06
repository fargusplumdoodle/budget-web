import React, { FunctionComponent, useState } from "react";
import {
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useController, useFormContext } from "react-hook-form";
import capitalize from "lodash/capitalize";

type Sign = "+" | "-";
interface Props {}

const AmountInput: FunctionComponent<Props> = () => {
  const {
    formState: { errors },
  } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name: "amount" });

  const [textInput, setTextInput] = useState<string>(
    Math.abs(value).toString()
  );
  const [sign, setSign] = useState<Sign>(value > 0 ? "+" : "-");

  const getValue = (withSign: Sign): number => {
    const floatValue = Math.abs(parseFloat(textInput));
    return withSign === "+" ? floatValue : 0 - floatValue;
  };

  const handleSignChange = (_: any, newSign: Sign | null) => {
    if (!newSign) return;
    setSign(newSign);
    onChange(getValue(newSign));
  };

  return (
    <>
      <Grid container wrap="nowrap" gap={1}>
        <Grid item>
          <TextField
            type="number"
            fullWidth
            sx={{
              "& input": {
                "-moz-appearance": "textfield",
                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            label="Amount"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onBlur={() => onChange(getValue(sign))}
          />
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            exclusive
            onChange={handleSignChange}
            aria-label="text alignment"
            value={sign}
            sx={(theme) => ({ height: theme.spacing(7) })}
          >
            <ToggleButton value="+" aria-label="left aligned">
              <Add />
            </ToggleButton>
            <ToggleButton value="-" aria-label="left aligned">
              <Remove />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      {!!errors.tags && (
        <FormHelperText error>
          {capitalize(errors.amount?.message)}
        </FormHelperText>
      )}
    </>
  );
};

export default AmountInput;
