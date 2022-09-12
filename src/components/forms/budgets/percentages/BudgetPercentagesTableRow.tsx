import * as React from "react";
import { Button, TableCell, TableRow } from "@mui/material";
import { Budget } from "../../../../store/models/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import { round } from "lodash";
import { Add, Remove } from "@mui/icons-material";
import { formatCurrency } from "../../../../util/formatters";

type BudgetPercentagesTableRowProps = {
  budget: Budget;
  maximumPercentageAllocated: boolean;
  onUpdate: (budget: Budget) => void;
};

const BudgetPercentagesTableRow: React.FC<BudgetPercentagesTableRowProps> =
  function ({ budget, onUpdate, maximumPercentageAllocated }) {
    const monthlyNetIncome = useSelector(
      (state: RootState) => state.userInfo.expected_monthly_net_income
    );

    const expectedMonthlyBudgetIncome = round(
      (budget.percentage / 100) * monthlyNetIncome,
      2
    );

    return (
      <TableRow>
        <TableCell>{budget.name}</TableCell>
        <TableCell>
          {formatCurrency(budget.income_per_month, false)} /{" "}
          {formatCurrency(budget.outcome_per_month, false)}
        </TableCell>
        <TableCell>
          {formatCurrency(expectedMonthlyBudgetIncome, false)}
        </TableCell>
        <TableCell>
          <Button
            disabled={maximumPercentageAllocated}
            onClick={() =>
              onUpdate({ ...budget, percentage: budget.percentage + 1 })
            }
          >
            <Add />
          </Button>
          {budget.percentage} %
          <Button
            disabled={budget.percentage === 0}
            onClick={() =>
              onUpdate({ ...budget, percentage: budget.percentage - 1 })
            }
          >
            <Remove />
          </Button>
        </TableCell>
      </TableRow>
    );
  };

export default BudgetPercentagesTableRow;
