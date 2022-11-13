import React, { FunctionComponent } from "react";
import {
  Budget,
  getBudgetChildren,
  selectAnalysisPeriod,
  selectBudgetPageSpendingReportByAnalysisPeriod,
} from "../../../store";
import { adaptMonthlyValue } from "./utils";
import StyledBudgetTreeItem from "./StyledBudgetTreeItem";
import { useSelector } from "react-redux";

interface Props {
  budget: Budget;
  budgets: Budget[];
}

const BudgetTreeItem: FunctionComponent<Props> = ({ budget, budgets }) => {
  const children = getBudgetChildren(budget, budgets);
  const analysisPeriod = useSelector(selectAnalysisPeriod);
  const spentThisPeriod = useSelector(
    selectBudgetPageSpendingReportByAnalysisPeriod(analysisPeriod)
  );

  const allocated = adaptMonthlyValue(budget.monthlyAllocation, analysisPeriod);
  const averageSpent = adaptMonthlyValue(
    budget.outcome_per_month,
    analysisPeriod
  );
  const spent = spentThisPeriod ? spentThisPeriod[budget.id!] : null;

  return (
    <StyledBudgetTreeItem
      nodeId={budget.id!.toString()}
      budgetName={budget.name}
      balance={budget.balance}
      allocated={allocated}
      spent={spent}
      averageSpent={averageSpent}
    >
      {children.map((child) => (
        <BudgetTreeItem key={child.id!} budget={child} budgets={budgets} />
      ))}
    </StyledBudgetTreeItem>
  );
};

export default BudgetTreeItem;
