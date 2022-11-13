import React, { FunctionComponent } from "react";
import { Dialog, DialogContent, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ThemeForm from "../../components/forms/ThemeForm";
import { closeAllPanes, selectOpenPane } from "../../store";
import TransactionPane from "../../components/panes/TransactionPane";
import BudgetPane from "../../components/panes/BudgetPane";

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
  const pane = useSelector(selectOpenPane);

  return (
    <Pane open={!!pane} onClose={() => dispatch(closeAllPanes())}>
      <PaneContent>
        {pane === "theme" && <ThemeForm />}
        {pane === "transaction" && <TransactionPane />}
        {pane === "budget" && <BudgetPane />}
      </PaneContent>
    </Pane>
  );
};

export default PaneProvider;
