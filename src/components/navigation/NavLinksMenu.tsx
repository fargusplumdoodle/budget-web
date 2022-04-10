import { useNavigate } from "react-router-dom";
import {
  Box,
  Menu as MuiMenu,
  Button,
  Typography,
  MenuItem,
  styled,
} from "@mui/material";
import { FunctionComponent } from "react";
import { links } from "./constants";
import { Menu as MenuIcon } from "@mui/icons-material";
import React from "react";
import { colors } from "../../app/theme";

interface NavLinksProps {}

const Menu = styled(MuiMenu)(() => ({
  paddingBottom: 0,
}));

const MenuLink = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}));

const MenuTitle = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

const NavLinks: FunctionComponent<NavLinksProps> = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const currentRoute = links.find(
    (link) => link.path === window.location.pathname
  );

  return (
    <>
      <Button onClick={handleClick}>
        <MenuIcon />
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
        {links.map((ln) => {
          const index = links.indexOf(ln);
          const selected = currentRoute === ln;

          return (
            <MenuItem
              key={index}
              onClick={() => {
                navigate(ln.path);
              }}
            >
              <MenuLink
                sx={{
                  color: selected ? colors.lightBlue : undefined,
                }}
              >
                {ln.icon}
                <MenuTitle>{ln.title}</MenuTitle>
              </MenuLink>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default NavLinks;
