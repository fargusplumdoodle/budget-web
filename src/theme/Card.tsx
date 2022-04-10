import { FunctionComponent } from "react";
import {
  Card as MaterialCard,
  CardProps as MaterialCardProps,
} from "@mui/material";

interface CardProps extends MaterialCardProps {}

const Card: FunctionComponent<CardProps> = (props) => {
  return <MaterialCard {...props} />;
};

export default Card;
