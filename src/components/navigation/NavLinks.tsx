import { ROUTES } from "../../app/AppRoutes";
import { tabProps } from "../tabs";
import { useNavigate } from "react-router-dom";
import { Box, SxProps, Tab, Tabs, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface NavLinksProps {}

const NavLinks: FunctionComponent<NavLinksProps> = () => {
  const navigate = useNavigate();

  const links = [
    ROUTES.DASHBOARD,
    ROUTES.TRANSACTIONS_ADD,
    ROUTES.TRANSACTIONS_LIST,
    ROUTES.BUDGET_LIST,
    ROUTES.SETTINGS,
  ];

  const selected = links.find((link) => link.path === window.location.pathname);

  return (
    <Tabs
      orientation="horizontal"
      variant="scrollable"
      value={selected ? links.indexOf(selected) : 0}
      aria-label="Navigation Links"
      sx={{  }}
    >
      {links.map((ln) => {
        const index = links.indexOf(ln);
        return (
          <Tab
            key={index}
            icon={ln.icon}
            iconPosition="end"
            sx={{ marginLeft: "auto" }}
            onClick={() => {
              navigate(ln.path);
            }}
            {...tabProps(index)}
          />
        );
      })}
    </Tabs>
  );
};

export default NavLinks;
