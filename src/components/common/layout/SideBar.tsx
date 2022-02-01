import * as React from "react";
import { FunctionComponent } from "react";
import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SideBar: FunctionComponent<{}> = () => {
  const navigate = useNavigate();
  const sideBarLinks = [
    { text: "Add Transaction", route: "/transactions/add" },
    { text: "Transactions", route: "/transactions" },
    { text: "Budgets", route: "/budgets" },
    { text: "Budget Percentages", route: "/budgets/percentages" },
    { text: "Transfer Funds", route: "/budgets/transfer_funds" },
    { text: "Dashboard", route: "/" },
    { text: "Tags", route: "/tags" },
  ];

  return (
    <div className="sidebar">
      <nav>
        <List>
          {sideBarLinks.map((ln) => {
            return (
              <ListItem key={ln.text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(ln.route);
                  }}
                >
                  <Typography variant="h6">{ln.text}</Typography>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </nav>
    </div>
  );
};

export default SideBar;
