import * as React from "react";
import { FunctionComponent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import "../../../views/transactions_list/TransactionsTable.css";
import { commaSeparatedTagNames } from "../../../util/formatters";
import { useDispatch } from "react-redux";
import { openTransactionPane } from "../../../store";
import { Transaction } from "../../../store";

interface TransactionTableProps {
  transactions: Transaction[];
  showBudget: boolean;
  onCreateCallback?: (trans: Transaction) => void;
  onUpdateCallback?: (trans: Transaction) => void;
  onDeleteCallback?: (trans: Transaction) => void;
}

const TransactionTable: FunctionComponent<TransactionTableProps> = (
  props: TransactionTableProps
) => {
  const headers = ["Budget", "Tags", "Description", "Date", "Amount"];
  const dispatch = useDispatch();

  return (
    <>
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
            {props.transactions.map((trans) => {
              return (
                <TableRow
                  key={trans.id}
                  onClick={() => {
                    dispatch(openTransactionPane(trans));
                  }}
                >
                  <TableCell>{trans.budget.name}</TableCell>
                  <TableCell>{commaSeparatedTagNames(trans)}</TableCell>
                  <TableCell>{trans.description}</TableCell>
                  <TableCell>
                    {trans.date.toLocaleDateString("en-CA")}
                  </TableCell>
                  <TableCell>{trans.amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default TransactionTable;
