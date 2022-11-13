import React from "react";
import { TreeView } from "@mui/lab";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BudgetTreeItem from "./BudgetTreeItem";
import { selectBudgetList, selectBudgetRoot } from "../../../store";

function BudgetTree() {
  const budgets = useSelector(selectBudgetList);
  const rootBudget = useSelector(selectBudgetRoot);
  return (
    <TreeView
      aria-label="budget tree"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultExpanded={[rootBudget!.id!.toString()]}
      disableSelection
      disabledItemsFocusable
    >
      <BudgetTreeItem budget={rootBudget!} budgets={budgets} />
    </TreeView>
  );
}

export default BudgetTree;
