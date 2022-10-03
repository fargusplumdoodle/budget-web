import * as React from "react";
import { FunctionComponent } from "react";
import { Box, Card, styled, Typography } from "@mui/material";
import StatusOverview from "../components/dashboard/StatusOverview";
import { useSelector } from "react-redux";
import { ProviderContext, withSnackbar } from "notistack";
import LineGraph from "../components/report/LineGraph";
import BudgetTable from "../components/budget/BudgetTable";
import { ReportTypes } from "../api/types";
import SpendingSummary from "../components/report/spending_summary/SpendingSummary";
import { DateTime } from "luxon";
import { EXPECTED_BUDGETS } from "../app/settings";
import { fadeIn } from "../theme/animations";
import { RootState, selectBudgetByName, selectBudgetList } from "../store";

interface OwnProps extends ProviderContext {}

type Props = OwnProps;

const CardArea = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: theme.spacing(3),
  height: "100%",
  width: "100%",
  opacity: 0.8,
  flexWrap: "wrap",
  marginTop: theme.spacing(3),
}));

const DashboardCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1),
  minWidth: 300,
  flexGrow: 1,
  [theme.breakpoints.down(977)]: {
    width: "100%",
    maxWidth: "100%",
  },
  ":nth-of-type(odd)": {
    animation: `${fadeIn} 500ms linear 0.1s 1 normal forwards`,
    opacity: 0,
  },
  ":nth-of-type(even)": {
    animation: `${fadeIn} 500ms linear 0.3s 1 normal forwards`,
    opacity: 0,
  },
}));

const DashboardPage: FunctionComponent<Props> = () => {
  const budgets = useSelector(selectBudgetList);
  const savings = useSelector(selectBudgetByName(EXPECTED_BUDGETS.SAVINGS));
  if (budgets.length === 0) {
    return <></>;
  }

  const query = new URLSearchParams({
    date__gte: DateTime.now().minus({ months: 3 }).toISODate(),
    budgets__excludes: savings.id!.toString(),
  });

  return (
    <Box>
      <Box
        sx={{
          height: [],
        }}
      >
        <StatusOverview />
      </Box>

      <CardArea>
        <DashboardCard>
          <BudgetTable budgets={budgets} />
        </DashboardCard>

        <DashboardCard>
          <Typography variant="h5">Balance</Typography>
          <LineGraph
            hideDateLte
            hideTimebucketSelector
            defaultTimebucketSize="one_week"
            reportTypes={[ReportTypes.BUDGET_BALANCE]}
          />
        </DashboardCard>

        <DashboardCard>
          <Typography variant="h5">Pulse</Typography>
          <LineGraph
            queryParams={query}
            hideDateLte
            hideTimebucketSelector
            defaultTimebucketSize="one_week"
            reportTypes={[ReportTypes.INCOME, ReportTypes.OUTCOME]}
          />
        </DashboardCard>

        <DashboardCard>
          <Typography variant="h5">Spending Summary</Typography>
          <SpendingSummary
            queryParams={query}
            defaultTimebucketSize="one_month"
          />
        </DashboardCard>
      </CardArea>
    </Box>
  );
};

export default withSnackbar(DashboardPage);
