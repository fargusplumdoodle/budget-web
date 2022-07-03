import { styled, TextField } from "@mui/material";
import { FunctionComponent } from "react";
import { ExpressionInputProps } from "../types";

const Input = styled(TextField)(() => ({
  width: "100%",
}));

const CurrencyInput: FunctionComponent<ExpressionInputProps<string>> = ({
  value,
  onChange,
}) => {
  return (
    <Input
      defaultValue={value}
      variant="standard"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default CurrencyInput;
