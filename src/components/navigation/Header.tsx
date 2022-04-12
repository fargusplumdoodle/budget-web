import { Button, Box, styled, Typography } from "@mui/material";
import React from "react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/AppRoutes";
import { colors } from "../../app/theme";
import NavLinksMenu from "./NavLinksMenu";
import NavLinksTabs from "./NavLinksTabs";

interface HeaderProps {}

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  margin: theme.spacing(2),
}));

const Title = styled(Typography)(() => ({
  textAlign: "center",
  textTransform: "lowercase",
}));

const GradientBox = styled(Box)(() => ({
  background: `linear-gradient(90deg, ${colors.darkBlue} 0%, ${colors.purple} 100%)`,
  width: "100%",
  height: 2,
}));

const DesktopNavLinks = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const MobileNavLinks = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const Header: FunctionComponent<HeaderProps> = () => {
  const navigate = useNavigate();

  if (window.location.pathname === ROUTES.AUTH_CALLBACK.path) {
    return <></>;
  }

  return (
    <>
      <GradientBox />
      <Container>
        <Button onClick={() => navigate(ROUTES.DASHBOARD.path)}>
          <Title variant="h4">b</Title>
        </Button>
        <DesktopNavLinks>
          <NavLinksTabs />
        </DesktopNavLinks>
        <MobileNavLinks>
          <NavLinksMenu />
        </MobileNavLinks>
      </Container>
    </>
  );
};

export default Header;
