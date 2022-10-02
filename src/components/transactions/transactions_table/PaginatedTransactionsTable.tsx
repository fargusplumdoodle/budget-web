import * as React from "react";
import { FunctionComponent, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableFooter, TablePagination, Typography } from "@mui/material";
import "../../../views/transactions_list/TransactionsTable.css";
import { commaSeparatedTagNames } from "../../../util/formatters";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { openTransactionPane } from "../../../store";
import { useDispatch } from "react-redux";
import { Transaction } from "../../../store";

interface TransactionTableProps {
  transactions: Transaction[];
  showBudget: boolean;
  onCreateCallback?: (trans: Transaction) => void;
  onUpdateCallback?: (trans: Transaction) => void;
  onDeleteCallback?: (trans: Transaction) => void;
  defaultRowsPerPage?: number;
}

const PaginatedTransactionsTable: FunctionComponent<TransactionTableProps> = (
  props: TransactionTableProps
) => {
  const minimumRowsPerPage = 10;
  const [rowsPerPage, setRowsPerPage] = useState(
    props["defaultRowsPerPage"] || minimumRowsPerPage
  );
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  const headers = props.showBudget ? ["budget"] : [];
  headers.push("Tags", "Description", "Date", "Amount");
  const rowsPerPageOptions = [5, 10, 25, 50, 100, { label: "All", value: -1 }];
  const rows =
    rowsPerPage > 0 && props.transactions.length > minimumRowsPerPage
      ? props.transactions.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : props.transactions;

  return (
    <>
      <TableContainer>
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
            {rows.map((trans) => {
              return (
                <TableRow
                  key={trans.id}
                  onClick={() => {
                    dispatch(openTransactionPane(trans));
                  }}
                >
                  {props.showBudget ? (
                    <TableCell>{trans.budget.name}</TableCell>
                  ) : null}
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
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                count={props.transactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={(_, newPage) => {
                  setPage(newPage);
                }}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value));
                  setPage(0);
                }}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
export default PaginatedTransactionsTable;
