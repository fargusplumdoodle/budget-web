import * as React from "react";
import { FunctionComponent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import "../../../pages/transactions_list/TransactionsTable.css";
import { Transaction } from "../../../store/types/models";
import { commaSeparatedTagNames } from "../../../util/formatters";

interface TransactionTableProps {
  transactions: Transaction[];
  showBudget: boolean;
  maxHeight?: number;
}

const TransactionTable: FunctionComponent<TransactionTableProps> = (
  props: TransactionTableProps
) => {
  const headers = ["Budget", "Tags", "Description", "Date", "Amount"];
  const maxHeight = props["maxHeight"] ? props.maxHeight : 500;
  return (
    <TableContainer sx={{ overflow: "scroll", maxHeight: maxHeight }}>
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
                <TableCell>{commaSeparatedTagNames(trans)}</TableCell>
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
