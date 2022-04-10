import { tabProps } from "../tabs";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import { FunctionComponent } from "react";
import { links } from "./constants";

interface NavLinksProps {}

const NavLinks: FunctionComponent<NavLinksProps> = () => {
  const navigate = useNavigate();
  const selected = links.find((link) => link.path === window.location.pathname);

  return (
    <Tabs
      orientation="horizontal"
      variant="scrollable"
      value={selected ? links.indexOf(selected) : 0}
      aria-label="Navigation Links"
      sx={{}}
    >
      {links.map((ln) => {
        const index = links.indexOf(ln);
        return (
          <Tab
            key={index}
            icon={ln.icon}
            iconPosition="end"
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
