import * as React from "react";
import { FunctionComponent } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Settings from "@mui/icons-material/Settings";
import { IconButton, Typography } from "@mui/material";
import { openThemePane, resetAuth } from "../../../store";
import { ROUTES } from "../../../app/AppRoutes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface Props {}

const HeaderMenuSettings: FunctionComponent<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const buttonId = "settings-menu";

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenThemePane = () => {
    handleClose();
    dispatch(openThemePane());
  };

  const handleLogOut = () => dispatch(resetAuth());

  const handleOpenUserSettings = () => {
    handleClose();
    navigate(ROUTES.SETTINGS.path);
  };

  return (
    <>
      <IconButton
        id={buttonId}
        aria-controls={open ? buttonId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Settings />
      </IconButton>
      <Menu
        aria-labelledby={buttonId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleOpenThemePane}>Theme</MenuItem>
        <MenuItem onClick={handleOpenUserSettings}>User Settings</MenuItem>
        <MenuItem onClick={handleLogOut}>
          <Typography color="error">Log Out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
export default HeaderMenuSettings;
