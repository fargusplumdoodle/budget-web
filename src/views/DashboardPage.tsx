import * as React from "react";
import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { ProviderContext, withSnackbar } from "notistack";
import StatusOverview from "../components/dashboard/StatusOverview";

interface Props extends ProviderContext {}

const DashboardPage: FunctionComponent<Props> = () => (
  <Box>
    <StatusOverview />
  </Box>
);

export default withSnackbar(DashboardPage);
