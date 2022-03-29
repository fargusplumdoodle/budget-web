import * as React from "react";
import { Budget } from "../../../../store/types/models";
import { Table, TableBody, TableContainer, Typography } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import BudgetPercentagesTableRow from "./BudgetPercentagesTableRow";

type BudgetPercentagesTableProps = {
  budgets: Budget[];
  updateBudget: (budget: Budget) => void;
  maximumPercentageAllocated: boolean;
};

const BudgetPercentagesTable: React.FC<BudgetPercentagesTableProps> =
  function ({ budgets, updateBudget, maximumPercentageAllocated }) {
    const headers = [
      "Budget",
      "Recent Income / Outcome",
      "New Income",
      "Percentage",
    ];
    return (
      <TableContainer>
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
            {budgets.map((budget) => {
              return (
                <BudgetPercentagesTableRow
                  key={budget.id}
                  budget={budget}
                  onUpdate={updateBudget}
                  maximumPercentageAllocated={maximumPercentageAllocated}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

export default BudgetPercentagesTable;
