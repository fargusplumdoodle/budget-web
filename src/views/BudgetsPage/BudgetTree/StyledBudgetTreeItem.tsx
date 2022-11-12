// @ts-nocheck
import React from "react";
import { styled } from "@mui/material";
import {
  TreeItem as MuiTreeItem,
  treeItemClasses,
  TreeItemProps,
} from "@mui/lab";
import BudgetTreeItemContentComponent from "./BudgetTreeItemContentComponent";

type StyledTreeItemProps = TreeItemProps & {
  budgetName: string;
  balance: number;
  allocated: number | null;
  spent: number;
  averageSpent: number | null;
};

const TreeItem = styled(MuiTreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    paddingRight: theme.spacing(1),
    borderRadius: "4px",
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledBudgetTreeItem(props: StyledTreeItemProps) {
  const { budgetName, allocated, averageSpent, spent, balance, ...other } =
    props;
  // @ts-nocheck
  return (
    <TreeItem
      ContentComponent={BudgetTreeItemContentComponent}
      ContentProps={{
        budgetName,
        allocated,
        averageSpent,
        spent,
        balance,
      }}
      {...other}
    />
  );
}

export default StyledBudgetTreeItem;
