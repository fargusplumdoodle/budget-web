import * as React from "react";
import { FunctionComponent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { Budget } from "../../store/models/types";
import { ROUTES } from "../../app/AppRoutes";
import { routeWithId } from "../../util/routing";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../util/formatters";

interface OwnProps {
  budgets: Budget[];
}

type Props = OwnProps;

const BudgetTable: FunctionComponent<Props> = (props: Props) => {
  const navigate = useNavigate();
  const headers = ["Name", "Monthly Allocation", "balance"];
  return (
    <TableContainer sx={{ alignContent: "center" }}>
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
              <TableRow
                key={budget.id}
                onClick={() => {
                  navigate(routeWithId(ROUTES.BUDGET_DETAIL.path, budget.id!));
                }}
              >
                <TableCell>{budget.name}</TableCell>
                <TableCell>{budget.monthlyAllocation}</TableCell>
                <TableCell>{formatCurrency(budget.balance, false)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BudgetTable;
