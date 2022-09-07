import React, { FunctionComponent } from "react";
import { Dialog, DialogContent, styled } from "@mui/material";
import ThemeForm from "../../components/forms/ThemeForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { closeAllPanes } from "../../store/actions/panesActions";

const Pane = styled(Dialog)(() => ({
  left: "auto",
  bottom: "auto",
  "& [class*=MuiDialog-paper]": {
    margin: 0,
    borderRadius: 0,
  },
}));
const PaneContent = styled(DialogContent)(() => ({
  width: 360 - 32,
  height: "100vh",
}));

const PaneProvider: FunctionComponent = () => {
  const dispatch = useDispatch();
  const pane = useSelector((state: RootState) => state.panes.current);

  return (
    <Pane open={!!pane} onClose={() => dispatch(closeAllPanes())}>
      <PaneContent>{pane === "theme" && <ThemeForm />}</PaneContent>
    </Pane>
  );
};

export default PaneProvider;
