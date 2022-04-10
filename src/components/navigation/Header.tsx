import { Box, styled, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import NavLinks from "./NavLinks";

interface HeaderProps {}

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  margin: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  textAlign: "center",
}));

const GradientBox = styled(Box)(({ theme }) => ({
  background:
    "linear-gradient(90deg, rgba(39,10,148,1) 0%, rgba(173,20,177,1) 100%)",
  width: "100%",
  height: 2,
}));

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <>
      <GradientBox />
      <Container>
        <Title variant="h4">b</Title>
        <NavLinks />
      </Container>
    </>
  );
};

export default Header;
