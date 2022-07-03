import { InputAdornment, styled, TextField } from "@mui/material";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { ExpressionInputProps } from "../types";

const Input = styled(TextField)(() => ({
  width: "100%",
}));

const CurrencyInput: FunctionComponent<ExpressionInputProps<number>> = ({
  value,
  onChange,
}) => {
  const [error, setError] = useState(false);

  const submit = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = parseFloat(e.target.value);
    const valid = e.target.value.match(/^[0-9.]+$/);

    if (!valid) {
      setError(true);
    } else {
      setError(false);
      onChange(input);
    }
  };

  return (
    <Input
      defaultValue={value}
      variant="standard"
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      error={error}
      onChange={submit}
    />
  );
};

export default CurrencyInput;
