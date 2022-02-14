import * as React from "react";
import { FunctionComponent } from "react";
import { Tab, Tabs, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../app/AppRoutes";
import { tabProps } from "../tabs";
import {
  TrendingUp,
  Add,
  List,
  ManageAccounts,
  AttachMoney,
} from "@mui/icons-material";
import AuthButton from "../../auth/AuthButton";

const SideBar: FunctionComponent<{}> = () => {
  const navigate = useNavigate();

  const sideBarLinks = [
    { text: "Dashboard", route: ROUTES.DASHBOARD, icon: <TrendingUp /> },
    { text: "Add Transactions", route: ROUTES.TRANSACTIONS_ADD, icon: <Add /> },
    { text: "Transactions", route: ROUTES.TRANSACTIONS_LIST, icon: <List /> },
    { text: "Budgets", route: ROUTES.BUDGETS, icon: <AttachMoney /> },
    { text: "User Info", route: ROUTES.USER_INFO, icon: <ManageAccounts /> },
  ];

  const selected = sideBarLinks.find(
    (link) => link.route.path === window.location.pathname
  );

  return (
    <div className="sidebar">
      <div>
        <Typography variant="h4" component="div" sx={{ m: 2, p: 2 }}>
          Budget
        </Typography>

        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={sideBarLinks.indexOf(selected)}
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
                label={ln.text}
                onClick={() => {
                  navigate(ln.route.path);
                }}
                {...tabProps(sideBarLinks.indexOf(ln))}
              />
            );
          })}
        </Tabs>
      </div>

      <AuthButton sx={{ m: 4 }} />
    </div>
  );
};

export default SideBar;
