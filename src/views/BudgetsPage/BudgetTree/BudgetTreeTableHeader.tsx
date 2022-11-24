import React, { FunctionComponent } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { BUDGET_STATS_TABLE_WIDTH } from "./constants";
import BudgetTreeTableValue from "./BudgetTreeTableValue";

const COLUMNS = [
  {
    value: "Allocated",
    hideOnSmallScreen: true,
    helperText:
      "The amount of money that is allocated to this budget and any child budgets for this analysis period.",
    bold: true,
  },
  {
    value: "Income",
    hideOnSmallScreen: true,
    helperText:
      "The amount of money that was added to this budget in this analysis period. This includes regular income and any transactions that might be positive.",
    bold: true,
  },
  {
    value: "Outcome",
    hideOnSmallScreen: true,
    helperText:
      "The amount of money that left this budget in this analysis period",
    bold: true,
  },
  {
    value: "+/-",
    hideOnSmallScreen: true,
    helperText:
      "The difference between your income and your outcome for this analysis period",
    bold: true,
  },
  {
    value: "Balance",
    hideOnSmallScreen: false,
    helperText:
      "The amount of money currently available in this budget. This value is not temporally bound.",
    bold: true,
  },
];

const BudgetTreeTableHeader: FunctionComponent = () => (
  <Grid
    container
    item
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
    <Grid item component={Typography} variant="body2" sx={{ flexGrow: 1 }}>
      Budget
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
      {COLUMNS.map((budgetTreeTableValueProps) => (
        <BudgetTreeTableValue {...budgetTreeTableValueProps} />
      ))}
    </Grid>
    <Grid item component={IconButton} aria-label="menu" sx={{ width: 45 }} />
  </Grid>
);

export default BudgetTreeTableHeader;
