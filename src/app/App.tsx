import * as React from "react";
import InitLoading from "../components/InitLoading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Header from "../components/navigation/Header";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { fetchBudgets } from "../store/actions/budgetActions";
import { AppDispatch, RootState } from "../store/configureStore";
import { fetchTags } from "../store/actions/tagActions";
import { fetchUserInfo } from "../store/actions/userInfoActions";
import { StateStatus } from "../store/types/stateTypes";

type DispatchFn = () => (dispatch: AppDispatch) => void;
type ExpectedData = {
  stateType: "budgets" | "tags" | "userInfo";
  action: DispatchFn;
};

const expectedData: ExpectedData[] = [
  {
    stateType: "budgets",
    action: fetchBudgets,
  },
  {
    stateType: "tags",
    action: fetchTags,
  },
  {
    stateType: "userInfo",
    action: fetchUserInfo,
  },
];

const App: React.FunctionComponent = () => {
  const rootState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [initState, setInitState] = useState<StateStatus>("init");

  const requiredState = expectedData.filter(
    ({ stateType }) => rootState[stateType].status === "init"
  );
  const loaded = expectedData.filter(
    ({ stateType }) => rootState[stateType].status === "loaded"
  );
  const error = expectedData.filter(
    ({ stateType }) => rootState[stateType].status === "error"
  );

  useEffect(() => {
    if (requiredState.length > 0) {
      requiredState.forEach(({ action }) => dispatch(action()));
      setInitState("loading");
    }
    if (loaded.length === expectedData.length) {
      setInitState("loaded");
    }
    if (error.length !== 0) {
      setInitState("error");
    }
  }, [requiredState, loaded, error, dispatch]);
  return (
    <>
      <div className="App">
        {initState === "loaded" ? (
          <>
            <Header />
            <div className="content">
              <AppRoutes />
            </div>
          </>
        ) : (
          <InitLoading />
        )}
      </div>

      <Dialog open={initState === "error"}>
        <DialogTitle>Failed to Load</DialogTitle>
        <DialogContent>
          <ul>
            {error.map((data: ExpectedData) => (
              <li key={error.indexOf(data)}>{data.stateType}</li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default App;
