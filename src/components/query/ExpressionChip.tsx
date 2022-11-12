import { Cancel } from "@mui/icons-material";
import { Box, keyframes, styled, Typography } from "@mui/material";
import * as React from "react";
import { FunctionComponent } from "react";
import { colors, transparentColors } from "../../app/theme";
import { Expression } from "./types";

export const shrinkRight = keyframes`
  0% {
    padding-right: 0;
  }
  100% {
    padding-right: -36px;
    background-color: ${transparentColors.darkBlue(0.4)};
  }
`;

export const fadeRight = keyframes`
  0% {
    transform: translate(-5px, 0);
    opacity: 0;
  }
  60% {
    opacity: 0.0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

const Container = styled(Box)(() => ({
  display: "flex",
  backgroundColor: colors.subtleBlue,
  color: colors.textBlue,
  justifyContent: "center",
  alignItems: "center",
  padding: "0 8px",
  borderRadius: 4,
  height: 36,

  "&:hover": {
    animation: `${shrinkRight} 250ms linear 0s 1 normal forwards`,
    svg: {
      display: "block",
      animation: `${fadeRight} 250ms linear 0s 1 normal forwards`,
    },
  },
}));

const Label = styled(Typography)(() => ({ whiteSpace: "nowrap" }));

const DeleteButton = styled(Cancel)(() => ({
  padding: 0,
  paddingLeft: 5,
  display: "none",
  zIndex: 2,
}));

interface ExpressionChipProps {
  onDelete: (expression: Expression<any>) => void;
  onClick: (expression: Expression<any>) => void;
  expression: Expression<any>;
}

const ExpressionChip: FunctionComponent<ExpressionChipProps> = ({
  expression,
  onClick,
  onDelete,
}) => (
  <Container>
    <Label variant="caption" onClick={() => onClick(expression)}>
      {`${expression.operand.label} ${
        expression.operator.name
      } ${expression.operand.inputLabel(expression.value)}`}
    </Label>
    <DeleteButton onClick={() => onDelete(expression)} />
  </Container>
);

export default ExpressionChip;
