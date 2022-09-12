import * as React from "react";
import { EXPECTED_BUDGETS } from "../../../../app/settings";
import { Budget } from "../../../../store/models/types";
import { SxProps, Typography } from "@mui/material";
import { sum } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import { formatCurrency } from "../../../../util/formatters";
type BudgetPercentageSummaryProps = {
  budgets: Budget[];
  sx?: SxProps;
};

const BudgetPercentageSummary: React.FC<BudgetPercentageSummaryProps> =
  function ({ budgets }) {
    const monthlyNetIncome = useSelector(
      (state: RootState) => state.userInfo.expected_monthly_net_income
    );
    const notSavingsBudgets = budgets.filter(
      (b) => b.name !== EXPECTED_BUDGETS.SAVINGS
    );
    const percentageAllocated = sum(notSavingsBudgets.map((b) => b.percentage));
    const savingsPercentage =
      100 - sum(notSavingsBudgets.map((b) => b.percentage));

    const expectedSavingsContributionsPerYear =
      monthlyNetIncome * (savingsPercentage / 100) * 12;

    return (
      <div>
        <Typography>Allocated: {percentageAllocated}%</Typography>
        <Typography>Remainder for Savings: {savingsPercentage}%</Typography>
        <Typography>
          Expected Savings Contributions Per Year:{" "}
          {formatCurrency(expectedSavingsContributionsPerYear, false)}
        </Typography>
      </div>
    );
  };

export default BudgetPercentageSummary;
