import * as React from "react";
import { FunctionComponent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination, Typography } from "@mui/material";
import "../../../pages/transactions_list/TransactionsTable.css";
import { Transaction } from "../../../store/types/models";

interface PaginatedTransactionTableProps {
  transactions: Transaction[];
  showBudget: boolean;
  rowsPerPage: number;
  count: number;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  handlePageSizeChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const PaginatedTransactionTable: FunctionComponent<
  PaginatedTransactionTableProps
> = (props: PaginatedTransactionTableProps) => {
  const headers = ["Budget", "Description", "Date", "Amount"];
  return (
    <TableContainer sx={{ overflow: "scroll", alignContent: "center" }}>
      <Table aria-label="transaction list">
        <TableHead>
          <TableRow>
            <TablePagination
              count={props.count}
              page={props.page}
              onPageChange={props.onPageChange}
              rowsPerPage={props.rowsPerPage}
              onRowsPerPageChange={props.handlePageSizeChange}
            />
          </TableRow>
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
export default PaginatedTransactionTable;
