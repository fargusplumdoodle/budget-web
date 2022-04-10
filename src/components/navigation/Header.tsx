import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { FunctionComponent } from "react";
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
  textShadow: "0px 0px 50px rgba(39,10,148,1)",
}));

const GradientBox = styled(Box)(() => ({
  background:
    "linear-gradient(90deg, rgba(39,10,148,1) 0%, rgba(173,20,177,1) 100%)",
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
  return (
    <>
      <GradientBox />
      <Container>
        <Title variant="h4">b</Title>
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
