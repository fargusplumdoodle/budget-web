import * as React from "react";
import { FunctionComponent } from "react";
import { Box, SxProps, Tab, Tabs, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/AppRoutes";
import { tabProps } from "../tabs";
import {
  TrendingUp,
  Add,
  List,
  ManageAccounts,
  AttachMoney,
} from "@mui/icons-material";

const classes: { [name: string]: SxProps } = {
  root: {
    backgroundColor: "#1e1e1e",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    textAlign: "center",
    m: 2,
  }
};

const SideBar: FunctionComponent<{}> = () => {
  const navigate = useNavigate();

  const sideBarLinks = [
    { text: "Dashboard", route: ROUTES.DASHBOARD, icon: <TrendingUp /> },
    { text: "Add Transactions", route: ROUTES.TRANSACTIONS_ADD, icon: <Add /> },
    { text: "Transactions", route: ROUTES.TRANSACTIONS_LIST, icon: <List /> },
    { text: "Budgets", route: ROUTES.BUDGET_LIST, icon: <AttachMoney /> },
    { text: "User Info", route: ROUTES.USER_INFO, icon: <ManageAccounts /> },
  ];

  const selected = sideBarLinks.find(
    (link) => link.route.path === window.location.pathname
  );

  return (
    <Box sx={classes.root}>
      <div>
        <Typography variant="h4" sx={classes.title}>
          b
        </Typography>

        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={selected ? sideBarLinks.indexOf(selected) : 0}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {sideBarLinks.map((ln) => {
            return (
              <Tab
                key={sideBarLinks.indexOf(ln)}
                icon={ln.icon}
                iconPosition="end"
                sx={{ marginLeft: "auto" }}
                // label={ln.text}
                onClick={() => {
                  navigate(ln.route.path);
                }}
                {...tabProps(sideBarLinks.indexOf(ln))}
              />
            );
          })}
        </Tabs>
      </div>

    </Box>
  );
};

export default SideBar;
