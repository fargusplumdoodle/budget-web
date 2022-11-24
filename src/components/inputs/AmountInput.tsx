import React, { FunctionComponent, useState } from "react";
import {
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
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
          {capitalize(errors.amount?.message as string)}
        </FormHelperText>
      )}
    </>
  );
};

export default AmountInput;
