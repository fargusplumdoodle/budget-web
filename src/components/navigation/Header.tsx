import {
  AppBar,
  Box,
  Drawer as MuiDrawer,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/AppRoutes";
import { colors } from "../../app/theme";
import { getCurrentRoute } from "../../util/routing";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { toggleMobileDrawer } from "../../store/actions/uiActions";

interface HeaderProps {}

const Container = styled(AppBar)(({ theme }) => ({
  // display: "flex",
  // flexDirection: "row",
  // justifyContent: "space-between",
  // alignItems: "center",
  // margin: theme.spacing(2),
}));

const Title = styled(Typography)(() => ({
  textAlign: "center",
  textTransform: "lowercase",
  color: colors.textBlue,
}));

const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  width: "100%",
  height: 3,
}));

const Header: FunctionComponent<HeaderProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentRoute = getCurrentRoute();

  if (window.location.pathname === ROUTES.AUTH_CALLBACK.path) {
    return <></>;
  }

  return (
    <>
      <Container position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => dispatch(toggleMobileDrawer())}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{currentRoute!.title}</Typography>
        </Toolbar>
      </Container>

      {/*<Container>*/}
      {/*  <Box onClick={() => navigate(ROUTES.DASHBOARD.path)}>*/}
      {/*    <Title variant="h4">b</Title>*/}
      {/*  </Box>*/}
      {/*  <DesktopNavLinks>*/}
      {/*    <NavLinksTabs />*/}
      {/*  </DesktopNavLinks>*/}
      {/*  <MobileNavLinks>*/}
      {/*    <NavLinksMenu />*/}
      {/*  </MobileNavLinks>*/}
      {/*</Container>*/}
    </>
  );
};

export default Header;
