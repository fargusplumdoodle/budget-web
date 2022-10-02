import React, { FunctionComponent } from "react";
import { Dialog, DialogContent, styled } from "@mui/material";
import ThemeForm from "../../components/forms/ThemeForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { closeAllPanes } from "../../store/actions/panesActions";
import TransactionPane from "../../components/panes/TransactionPane";
import { selectMobileDrawerOpen } from "../../store/location";

const Pane = styled(Dialog)(() => ({
  left: "auto",
  bottom: "auto",
  "& [class*=MuiDialog-paper]": {
    margin: 0,
    borderRadius: 0,
  },
}));
const PaneContent = styled(DialogContent)(() => ({
  width: 360 - 1,
  height: "100vh",
}));

const PaneProvider: FunctionComponent = () => {
  const dispatch = useDispatch();
  const pane = useSelector(selectMobileDrawerOpen);

  return (
    <Pane open={!!pane} onClose={() => dispatch(closeAllPanes())}>
      <PaneContent>
        {pane === "theme" && <ThemeForm />}
        {pane === "transaction" && <TransactionPane />}
      </PaneContent>
    </Pane>
  );
};

export default PaneProvider;
