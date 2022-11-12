import React, { FunctionComponent, useContext } from "react";
import { Budget, getBudgetChildren } from "../../../store";
import BudgetsPageContext from "../BudgetPageContext";
import { adaptMonthlyValue } from "./utils";
import StyledBudgetTreeItem from "./StyledBudgetTreeItem";

interface Props {
  budget: Budget;
  budgets: Budget[];
}

const BudgetTreeItem: FunctionComponent<Props> = ({ budget, budgets }) => {
  const children = getBudgetChildren(budget, budgets);
  const { analysisPeriod, spentThisPeriod } = useContext(BudgetsPageContext);
  const allocated = adaptMonthlyValue(
    budget.monthlyAllocation,
    analysisPeriod.value
  );
  const averageSpent = adaptMonthlyValue(
    budget.outcome_per_month,
    analysisPeriod.value
  );

  return (
    <StyledBudgetTreeItem
      nodeId={budget.id!.toString()}
      budgetName={budget.name}
      balance={budget.balance}
      allocated={allocated}
      spent={spentThisPeriod[budget.id!]}
      averageSpent={averageSpent}
    >
      {children.map((child) => (
        <BudgetTreeItem key={child.id!} budget={child} budgets={budgets} />
      ))}
    </StyledBudgetTreeItem>
  );
};

export default BudgetTreeItem;
