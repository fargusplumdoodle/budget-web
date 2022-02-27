import * as React from "react";
import { FunctionComponent } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { sum } from "lodash";
import { formatCurrency } from "../../util/formatters";
import { getAverageOutcomePerMonth } from "../../util/stats";
import { Classes } from "../../util/types";

const classes: Classes = {
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stats: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
};

const StatusOverview: FunctionComponent = () => {
  const budgets = useSelector((state: RootState) => state.budgets.list);
  const [monthlyOutcome, setMonthlyOutcome] = React.useState<number>(0.01);
  const totalBudgetBalance = sum(budgets.map((budget) => budget.balance));

  React.useEffect(() => {
    getAverageOutcomePerMonth().then((r) => setMonthlyOutcome(r));
  }, []);

  return (
    <Box sx={classes.root}>
      <Box sx={classes.stats}>
        <Typography variant="body1">
          Monthly Outcome: {formatCurrency(monthlyOutcome, false)}
        </Typography>
        <Typography variant="body1">
          Coast Time: {Math.round(totalBudgetBalance / monthlyOutcome)}
        </Typography>
      </Box>

      <Typography variant="h3">
        {formatCurrency(totalBudgetBalance, false)}
      </Typography>
    </Box>
  );
};

export default StatusOverview;
