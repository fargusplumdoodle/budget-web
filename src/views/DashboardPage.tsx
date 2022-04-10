import * as React from "react";
import { FunctionComponent } from "react";
import BudgetTable from "../components/budget/BudgetTable";
import { Box, Grid, Stack } from "@mui/material";
import DashboardTile from "../components/dashboard/DashboardTile";
import StatusOverview from "../components/dashboard/StatusOverview";
import { connect } from "react-redux";
import { RootState } from "../store/configureStore";
import { Budget } from "../store/types/models";
import { ProviderContext, withSnackbar } from "notistack";
import LineGraph from "../components/report/LineGraph/LineGraph";
import { ReportTypes } from "../api/types";
import SpendingSummary from "../components/report/spending_summary/SpendingSummary";

interface OwnProps extends ProviderContext {
  budgets: Budget[];
}

type Props = OwnProps;

const DashboardPage: FunctionComponent<Props> = ({ budgets }) => {
  if (budgets.length === 0) {
    return <></>;
  }
  return (
    <Box>
      <Box
        sx={{
          height: [],
        }}
      >
        <StatusOverview />
      </Box>

      <Grid container flexDirection={["column", "row"]} spacing={1}></Grid>
    </Box>
  );
};

const mapStateToProps = (state: RootState) => ({
  budgets: state.budgets.list,
});

export default connect(mapStateToProps)(withSnackbar(DashboardPage));
