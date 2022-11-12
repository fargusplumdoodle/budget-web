import React, { FunctionComponent } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { BUDGET_STATS_TABLE_WIDTH } from "./constants";
import BudgetTreeTableValue from "./BudgetTreeTableValue";

interface Props {}

const BudgetTreeTableHeader: FunctionComponent<Props> = (props) => (
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
      <BudgetTreeTableValue value="Allocated" hideOnSmallScreen />
      <BudgetTreeTableValue value="Average Spending" hideOnSmallScreen />
      <BudgetTreeTableValue value="Spent" hideOnSmallScreen />
      <BudgetTreeTableValue value="Balance" />
    </Grid>
    <Grid item component={IconButton} aria-label="menu" sx={{ width: 45 }} />
  </Grid>
);

export default BudgetTreeTableHeader;
