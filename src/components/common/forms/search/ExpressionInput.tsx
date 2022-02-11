import {
  Autocomplete,
  Button,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import * as React from "react";
import { Expression, Operand, Operator } from "./types";
import { OPERANDS } from "./constants";
import { Minimize } from "@mui/icons-material";

type ExpressionInputProps = {
  expression: Expression;
  setValue: (id: string, value: any) => void;
  inputArgs: object;
  onChangeOperand: (newOperand: Operand) => void;
  onChangeOperator: (newOperator: Operator) => void;
  onRemoveExpression: () => void;
};

const ExpressionInput: React.FC<ExpressionInputProps> = function ({
  inputArgs,
  expression,
  setValue,
  onChangeOperand,
  onChangeOperator,
  onRemoveExpression,
}) {
  const elementProps = expression.operand.requiresSetValueAndExpression
    ? { ...expression.operand.input.props, ...inputArgs, expression, setValue }
    : { ...expression.operand.input.props, ...inputArgs };
  return (
    <TableRow>
      <TableCell>
        <Autocomplete
          renderInput={(params) => <TextField {...params} variant="standard" />}
          disableClearable
          options={Object.values(OPERANDS)}
          getOptionLabel={(option) => option.label}
          value={expression.operand}
          isOptionEqualToValue={(option: Operand, value: Operand) => {
            return option.name === value.name;
          }}
          onChange={(e, data: Operand) => {
            onChangeOperand(data);
          }}
        />
      </TableCell>
      <TableCell>
        <Autocomplete
          disableClearable
          renderInput={(params) => <TextField {...params} variant="standard" />}
          options={expression.operand.operators}
          value={expression.operator}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option: Operator, value: Operator) => {
            return option.name === value.name;
          }}
          onChange={(e, data: Operator) => onChangeOperator(data)}
        />
      </TableCell>
      <TableCell>
        <expression.operand.input.element {...elementProps} />
      </TableCell>
      <TableCell>
        <Button onClick={onRemoveExpression}>
          <Minimize />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ExpressionInput;
