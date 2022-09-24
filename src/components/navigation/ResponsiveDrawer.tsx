import React, { FunctionComponent } from "react";
import { Drawer as MuiDrawer, Paper, Grid } from "@mui/material";
import Drawer from "./Drawer";
import { useDispatch, useSelector } from "react-redux";
import { DRAWER_WIDTH } from "./constants";
import { RootState } from "../../store/configureStore";
import { toggleMobileDrawer } from "../../store/actions/uiActions";

const ResponsiveDrawer: FunctionComponent = () => {
  const dispatch = useDispatch();
  const mobileDrawerOpen = useSelector(
    (state: RootState) => state.ui.mobileDrawerOpen
  );
  return (
    <Grid
      item
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
    >
      <MuiDrawer
        variant="temporary"
        open={mobileDrawerOpen}
        onClose={() => dispatch(toggleMobileDrawer())}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
      >
        <Drawer />
      </MuiDrawer>
      <MuiDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            borderRight: "none",
          },
        }}
        open
      >
        <Paper elevation={2} sx={{ height: "100%" }}>
          <Drawer />
        </Paper>
      </MuiDrawer>
    </Grid>
  );
};

export default ResponsiveDrawer;