import { Button, TableCell, TableRow, TextField } from "@mui/material";
import * as React from "react";
import { Operand, Operator } from "./types";
import { Autocomplete } from "@mui/lab";
import { OPERANDS } from "./constants";
import { Minimize } from "@mui/icons-material";

type ExpressionInput = {
  operand: Operand;
  inputArgs: object;
  onChangeOperand: (newOperand: Operand) => void;
  onChangeOperator: (newOperator: Operator) => void;
  onRemoveExpression: () => void;
};

const ExpressionInput: React.FC<ExpressionInput> = function ({
  inputArgs,
  operand,
  onChangeOperand,
  onChangeOperator,
  onRemoveExpression,
}) {
  return (
    <TableRow>
      <TableCell>
        <Autocomplete
          renderInput={(params) => <TextField {...params} variant="standard" />}
          options={Object.values(OPERANDS)}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option: Operand, value: Operand) => {
            return option.name === value.name;
          }}
          onChange={(e, data: Operand) => onChangeOperand(data)}
        />
      </TableCell>
      <TableCell>
        <Autocomplete
          renderInput={(params) => <TextField {...params} variant="standard" />}
          options={operand.operators}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option: Operator, value: Operator) => {
            return option.name === value.name;
          }}
          onChange={(e, data: Operator) => onChangeOperator(data)}
        />
      </TableCell>
      <TableCell>
        <operand.input.element {...operand.input.props} {...inputArgs} />
        <Button onClick={onRemoveExpression}>
          <Minimize />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ExpressionInput;
