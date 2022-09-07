import React, { FunctionComponent } from "react";
import { Dialog, DialogContent, styled } from "@mui/material";
import ThemeForm from "../../components/forms/ThemeForm";

const Pane = styled(Dialog)(() => ({
  left: "auto",
  bottom: "auto",
  "& [class*=MuiDialog-paper]": {
    margin: 0,
    borderRadius: 0,
  },
}));
const PaneContent = styled(DialogContent)(() => ({
  width: 288,
  height: "100vh",
}));

const PaneProvider: FunctionComponent = () => {
  // const pane = useSelector((state: RootState) => state.panes.current);
    const pane = 'theme'
  return (
    <Pane open={true}>
      <PaneContent>{pane === "theme" && <ThemeForm />}</PaneContent>
    </Pane>
  );
};

export default PaneProvider;
