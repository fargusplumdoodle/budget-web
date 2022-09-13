import React, { FunctionComponent } from "react";
import { TreeItem as MuiTreeItem } from "@mui/lab";
import { Budget } from "../../store/models/types";
import { getBudgetChildren } from "../../store/models/utils";
import capitalize from "lodash/capitalize";
import { styled } from "@mui/material";
import { getTransparent } from "@fargusplumdoodle/themes/dist/util";

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
  const children = getBudgetChildren(budget);
  return (
    <TreeItem nodeId={budget.id!.toString()} label={capitalize(budget.name)}>
      {children.map((child) => (
        <NavigationBudgetTreeItem key={child.id!} budget={child} />
      ))}
    </TreeItem>
  );
};

export default NavigationBudgetTreeItem;
