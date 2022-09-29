import { fetchBudgets } from "../../store/actions/budgetActions";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AppDispatch, RootState } from "../../store/configureStore";
import { fetchTags } from "../../store/actions/tagActions";
import { fetchUserInfo } from "../../store/actions/userInfoActions";
import InitLoading from "../../components/InitLoading";
import { State } from "../../store/types/stateTypes";
import {resetAuth} from "../../store/auth";

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

interface DataProviderProps {
  children: ReactNode | ReactNode[];
}

const DataProvider: FunctionComponent<DataProviderProps> = ({ children }) => {
  const rootState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [initState, setInitState] = useState<State>("init");

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
      {initState === "loaded" ? children : <InitLoading />}

      <Dialog open={initState === "error"}>
        <DialogTitle>Failed to Load</DialogTitle>
        <DialogContent>
          <ul>
            {error.map((data: ExpectedData) => (
              <li key={error.indexOf(data)}>{data.stateType}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(resetAuth());
            }}
          >
            Give up and log out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataProvider;
