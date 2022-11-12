import React, { FunctionComponent, useContext } from "react";
import {
  TreeItem as MuiTreeItem,
  treeItemClasses,
  TreeItemProps,
} from "@mui/lab";
import capitalize from "lodash/capitalize";
import { Grid, styled, Typography } from "@mui/material";
import { Budget, getBudgetChildren } from "../../../store";
import BudgetTreeTableValue from "./BudgetTreeTableValue";
import { BUDGET_STATS_TABLE_WIDTH } from "./constants";
import BudgetMenuOptions from "./BudgetMenuOptions";
import BudgetsPageContext from "../BudgetPageContext";
import { adaptMonthlyValue } from "./utils";

interface Props {
  budget: Budget;
  budgets: Budget[];
}

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

function StyledTreeItem(props: StyledTreeItemProps) {
  const { budgetName, balance, allocated, spent, averageSpent, ...other } =
    props;

  return (
    <TreeItem
      label={
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0.5,
            pr: 0,
          }}
          justifyContent="space-between"
          direction="row"
          wrap="nowrap"
        >
          <Grid
            item
            component={Typography}
            variant="body2"
            sx={{ flexGrow: 1, paddingRight: 1 }}
          >
            {capitalize(budgetName)}
          </Grid>
          <Grid
            item
            container
            justifyContent="space-evenly"
            wrap="nowrap"
            sx={(theme) => ({
              width: BUDGET_STATS_TABLE_WIDTH,
              [theme.breakpoints.down("sm")]: {
                width: "auto",
                justifyContent: "flex-end",
              },
            })}
          >
            <BudgetTreeTableValue value={allocated} hideOnSmallScreen />
            <BudgetTreeTableValue value={averageSpent} hideOnSmallScreen />
            <BudgetTreeTableValue value={spent} hideOnSmallScreen />
            <BudgetTreeTableValue value={balance} />
          </Grid>
          <Grid
            item
            component={BudgetMenuOptions}
            aria-label="budget options menu"
            budgetName={budgetName}
          />
        </Grid>
      }
      {...other}
    />
  );
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
    <StyledTreeItem
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
    </StyledTreeItem>
  );
};

export default BudgetTreeItem;
