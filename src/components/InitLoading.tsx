import { Box, CircularProgress, styled } from "@mui/material";
import { FunctionComponent } from "react";
import MovingShapesSVG from "../assets/MovingShapes.svg";

interface InitLoadingProps {
  message?: string;
}

const Container = styled(Box)(() => ({
  backgroundImage: `url(${MovingShapesSVG})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100vh",
  display: "flex",
  gap: 10,
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
}));

const InitLoading: FunctionComponent<InitLoadingProps> = () => (
  <Container>
    <CircularProgress />
  </Container>
);

export default InitLoading;
