import { Button, TableCell, TableRow, TextField } from "@mui/material";
import * as React from "react";
import { Operand, Operator } from "./types";
import { Autocomplete } from "@mui/lab";
import { OPERANDS } from "./constants";
import { Minimize } from "@mui/icons-material";

const sx = {
  root: {},
};

type ExpressionInput = {
  operand: Operand;
  operator: Operator;
  inputArgs: object; // todo: type?

  onChangeOperand: (newOperand: Operand) => void;
  onChangeOperator: (newOperator: Operator) => void;
  onRemoveExpression: () => void;
};

const ExpressionInput: React.FC<ExpressionInput> = function ({
  inputArgs,
  operand,
  operator,
  onChangeOperand,
  onChangeOperator,
  onRemoveExpression,
}) {
  // TODO: dropdown of operands
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
        <operator.input {...inputArgs} />
        <Button onClick={onRemoveExpression}>
          <Minimize />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ExpressionInput;
