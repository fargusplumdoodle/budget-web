import React, { FunctionComponent } from "react";
import {
  Budget,
  getBudgetChildren,
  selectAnalysisPeriod,
  selectBudgetPageIncomeReport,
  selectBudgetPageOutcomeReport,
} from "../../../store";
import { adaptMonthlyValue } from "./utils";
import StyledBudgetTreeItem from "./StyledBudgetTreeItem";
import { useSelector } from "react-redux";

interface Props {
  budget: Budget;
  budgets: Budget[];
}

const getDifference = (
  income: number | undefined,
  outcome: number | undefined
): number | null => {
  if (income === undefined || outcome === undefined) return null;

  return income + outcome;
};

const BudgetTreeItem: FunctionComponent<Props> = ({ budget, budgets }) => {
  const children = getBudgetChildren(budget, budgets);
  const analysisPeriod = useSelector(selectAnalysisPeriod);
  const income = useSelector(
    selectBudgetPageIncomeReport(analysisPeriod, budget)
  );
  const outcome = useSelector(
    selectBudgetPageOutcomeReport(analysisPeriod, budget)
  );
  const allocated = adaptMonthlyValue(budget.monthlyAllocation, analysisPeriod);
  const difference = getDifference(income, outcome);

  return (
    <StyledBudgetTreeItem
      nodeId={budget.id!.toString()}
      budgetName={budget.name}
      allocated={allocated}
      income={income!}
      outcome={outcome!}
      difference={difference}
      balance={budget.balance}
    >
      {children.map((child) => (
        <BudgetTreeItem key={child.id!} budget={child} budgets={budgets} />
      ))}
    </StyledBudgetTreeItem>
  );
};

export default BudgetTreeItem;
