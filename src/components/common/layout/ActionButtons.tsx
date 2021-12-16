import { AddCircle } from "@mui/icons-material";
import * as React from "react";

export interface IActionButtons {}

export default function ActionButtons(props: IActionButtons) {
  return (
    <div className="actionButtons">
      <AddCircle sx={{ fontSize: 60 }} />
    </div>
  );
}
