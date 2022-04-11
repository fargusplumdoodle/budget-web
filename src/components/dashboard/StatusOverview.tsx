import * as React from "react";
import { FunctionComponent } from "react";
import { Box, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { sum } from "lodash";
import { formatCurrency } from "../../util/formatters";
import { getAverageOutcomePerMonth } from "../../util/stats";
import { Classes } from "../../util/types";
import { EXPECTED_BUDGETS } from "../../app/settings";

import StackedWave from "../../assets/StackedWave.svg";

const classes: Classes = {
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundImage: `url(${StackedWave})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  stats: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
};
const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundImage: `url(${StackedWave})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  padding: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    justifyContent: "space-between",
  },
}));

const NetWorth = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const StatusOverview: FunctionComponent = () => {
  const budgets = useSelector((state: RootState) => state.budgets);
  const [monthlyOutcome, setMonthlyOutcome] = React.useState<number>(0.01);
  const totalBudgetBalance = sum(budgets.list.map((budget) => budget.balance));

  React.useEffect(() => {
    getAverageOutcomePerMonth().then((r) => setMonthlyOutcome(r));
  }, []);

  return (
    <Container>
      <Box sx={classes.stats}>
        <Typography variant="body1">
          Monthly Outcome: {formatCurrency(monthlyOutcome, false)}
        </Typography>
        <Typography variant="body1">
          Savings:{" "}
          {formatCurrency(
            budgets.byName[EXPECTED_BUDGETS.SAVINGS].balance,
            false
          )}
        </Typography>
        <Typography variant="body1">
          Personal:{" "}
          {formatCurrency(
            budgets.byName[EXPECTED_BUDGETS.PERSONAL].balance,
            false
          )}
        </Typography>
      </Box>

      <NetWorth>
        <Typography variant="h2">
          {formatCurrency(totalBudgetBalance, false)}
        </Typography>
      </NetWorth>
    </Container>
  );
};

export default StatusOverview;
