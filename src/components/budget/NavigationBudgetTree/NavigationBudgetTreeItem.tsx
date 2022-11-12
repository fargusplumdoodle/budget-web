import React, { FunctionComponent } from "react";
import { TreeItem as MuiTreeItem } from "@mui/lab";
import capitalize from "lodash/capitalize";
import { styled } from "@mui/material";
import { getTransparent } from "@fargusplumdoodle/themes/dist/util";
import { useSelector } from "react-redux";
import { Budget } from "../../../store/data/budgets/types";
import { getBudgetChildren } from "../../../store/data/budgets/utils";
import { selectBudgetList } from "../../../store";

interface Props {
  budget: Budget;
}
const TreeItem = styled(MuiTreeItem)(({ theme }) => ({
  '& [class*="MuiTreeItem-content"]': {
    borderRadius: "4px",
    "&.Mui-selected": {
      backgroundColor: theme.palette.secondary.main,
    },
    "&:hover": {
      backgroundColor: getTransparent(theme.palette.secondary.main, 0.4),
    },
  },
}));

const NavigationBudgetTreeItem: FunctionComponent<Props> = ({ budget }) => {
  const budgets = useSelector(selectBudgetList);
  const children = getBudgetChildren(budget, budgets);
  return (
    <TreeItem nodeId={budget.id!.toString()} label={capitalize(budget.name)}>
      {children.map((child) => (
        <NavigationBudgetTreeItem key={child.id!} budget={child} />
      ))}
    </TreeItem>
  );
};

export default NavigationBudgetTreeItem;
