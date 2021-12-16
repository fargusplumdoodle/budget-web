import * as React from "react";
import { FunctionComponent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card, Typography } from "@mui/material";

interface OwnProps {
  budgets: Budget[];
}

type Props = OwnProps;

const BudgetTable: FunctionComponent<Props> = (props: Props) => {
  const headers = [
    "Name",
    "Percentage",
    "Income Per Month",
    "Outcome Per Month",
    "balance",
  ];
  return (
    <TableContainer
      sx={{ height: 500, overflow: "scroll", alignContent: "center" }}
    >
      <Table aria-label="budget overview">
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
          {props.budgets.map((budget) => {
            return (
              <TableRow key={budget.id}>
                <TableCell>{budget.name}</TableCell>
                <TableCell>{budget.percentage}</TableCell>
                <TableCell>{budget.income_per_month}</TableCell>
                <TableCell>{budget.outcome_per_month}</TableCell>
                <TableCell>{budget.balance}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BudgetTable;
