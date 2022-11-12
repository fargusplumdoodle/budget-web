import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FunctionComponent } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Budget, selectBudgetByName } from "../../../store";
import { routeWithId } from "../../../util/routing";
import { ROUTES } from "../../../app/AppRoutes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface Props {
  budgetName: string;
}

const BudgetMenuOptions: FunctionComponent<Props> = ({ budgetName }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const budget = useSelector(selectBudgetByName(budgetName));
  const buttonId = "budget-menu";

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
  };

  const handleViewBudgetPage = () => {
    handleClose();
    navigate(routeWithId(ROUTES.BUDGET_DETAIL.path, budget.id!));
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
        <MoreVert />
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
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleViewBudgetPage}>View</MenuItem>
      </Menu>
    </>
  );
};
export default BudgetMenuOptions;
