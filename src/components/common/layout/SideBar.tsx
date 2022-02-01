import * as React from "react";
import { FunctionComponent } from "react";
import { Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../app/AppRoutes";
import { tabProps } from "../tabs";
import { TrendingUp, Add, List } from "@mui/icons-material";

const SideBar: FunctionComponent<{}> = () => {
  const navigate = useNavigate();

  const sideBarLinks = [
    { text: "Dashboard", route: ROUTES.DASHBOARD, icon: <TrendingUp /> },
    { text: "Add Transactions", route: ROUTES.TRANSACTIONS_ADD, icon: <Add /> },
    { text: "Transactions", route: ROUTES.TRANSACTIONS_LIST, icon: <List /> },
  ];

  const selected = sideBarLinks.find(
    (link) => link.route.path === window.location.pathname
  );

  return (
    <div className="sidebar">
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
              sx={{ marginLeft: "auto" }}
              iconPosition="end"
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
  );
};

export default SideBar;
