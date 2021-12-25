import * as React from "react";
import { FunctionComponent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import "./TransactionsTable.css";
import { Transaction } from "../../store/types/models";

interface TransactionTableProps {
  transactions: Transaction[];
  showBudget: boolean;
}

const TransactionTable: FunctionComponent<TransactionTableProps> = (
  props: TransactionTableProps
) => {
  const headers = ["Budget", "Description", "Date", "Amount"];
  return (
    <TableContainer sx={{ overflow: "scroll", alignContent: "center" }}>
      <Table aria-label="transaction list">
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
          {props.transactions.map((trans) => {
            return (
              <TableRow key={trans.id}>
                <TableCell>{trans.budget.name}</TableCell>
                <TableCell>{trans.description}</TableCell>
                <TableCell>{trans.date.toLocaleDateString("en-CA")}</TableCell>
                <TableCell>{trans.amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TransactionTable;