import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Table, TableBody, TableContainer, Typography } from "@mui/material";
import { Expression } from "./types";
import ExpressionInput from "./ExpressionInput";

type ExpressionTableProps = {
  register: (name: string) => object; // TODO: TYPE
  expressions: Expression[];
  setValue: (id: string, value: any) => void;
  onChangeExpression: (expression: Expression) => void;
  onRemoveExpression: (expression: Expression) => void;
};

const ExpressionTable: React.FC<ExpressionTableProps> = function ({
  register,
  expressions,
  onChangeExpression,
  setValue,
  onRemoveExpression,
}) {
  const headers = ["Operand", "Operator", "Value", "Remove"];

  return (
    <TableContainer sx={{ maxHeight: 574 }}>
      <Table aria-label="transaction list" stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map((headerName) => {
              return (
                <TableCell key={headerName}>
                  <Typography>{headerName}</Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {expressions.map((expression) => {
            return (
              <ExpressionInput
                key={expression.id}
                inputArgs={register(expression.id.toString())}
                setValue={setValue}
                expression={expression}
                onChangeOperand={(operand) =>
                  onChangeExpression({
                    ...expression,
                    operand,
                    operator: operand.operators[0],
                  })
                }
                onChangeOperator={(operator) =>
                  onChangeExpression({ ...expression, operator })
                }
                onRemoveExpression={() => onRemoveExpression(expression)}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpressionTable;
