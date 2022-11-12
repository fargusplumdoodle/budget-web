import * as React from "react";
import { FunctionComponent } from "react";
import { Box, Card, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ProviderContext, withSnackbar } from "notistack";
import { DateTime } from "luxon";
import StatusOverview from "../components/dashboard/StatusOverview";
import LineGraph from "../components/report/LineGraph";
import BudgetTable from "../components/budget/BudgetTable";
import SpendingSummary from "../components/report/spending_summary/SpendingSummary";
import { EXPECTED_BUDGETS } from "../app/settings";
import { fadeIn } from "../theme/animations";
import { RootState, selectBudgetByName, selectBudgetList } from "../store";
import { ReportTypes } from "../api/report";

interface Props extends ProviderContext {}

const DashboardPage: FunctionComponent<Props> = () => (
  <Box>
    <Box
      sx={{
        height: [],
      }}
    >
      <StatusOverview />
    </Box>
  </Box>
);

export default withSnackbar(DashboardPage);
