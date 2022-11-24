import * as React from "react";
import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import StatusOverview from "../components/dashboard/StatusOverview";

interface Props {}

const DashboardPage: FunctionComponent<Props> = () => (
  <Box>
    <StatusOverview />
  </Box>
);

export default DashboardPage;
