import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import InitLoading from "../../components/InitLoading";
import { resetAuth } from "../../store/auth";
import { fetchAllBudgets } from "../../store/data/budgets/slice";
import { selectBudgetFetchRequired } from "../../store/data/budgets/selectors";
import { selectRequestById } from "../../store/communication";
import capitalize from "lodash/capitalize";

interface DataProviderProps {
  children: ReactNode | ReactNode[];
}

const DataProvider: FunctionComponent<DataProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [awaitingFetches, setAwaitingFetches] = useState(false);

  const budgetFetchRequired = useSelector(selectBudgetFetchRequired);
  const budgetRequestState = useSelector(
    selectRequestById("budget", "retrieve")
  );

  const dataRequired = useMemo(
    () => [
      {
        fetchRequired: budgetFetchRequired,
        requestState: budgetRequestState,
        action: fetchAllBudgets({}),
      },
    ],
    [budgetRequestState, budgetFetchRequired]
  );

  const loading = dataRequired.some(
    ({ requestState }) => requestState?.status === "loading"
  );
  const error = dataRequired.some(
    ({ requestState }) => requestState?.status === "error"
  );
  const loaded = !dataRequired.some(
    ({ requestState }) => requestState?.status !== "loaded"
  );
  const fetchingRequired = dataRequired.some(
    ({ fetchRequired }) => fetchRequired
  );

  useEffect(() => {
    if (!fetchingRequired || awaitingFetches) return;
    setAwaitingFetches(true);

    dataRequired.forEach(({ fetchRequired, action }) => {
      if (fetchRequired) dispatch(action);
    });
  }, [awaitingFetches, dataRequired, dispatch, fetchingRequired]);

  return (
    <>
      {loading && <InitLoading />}
      {(loaded || !fetchingRequired) && children}
      {error && (
        <Dialog open={true}>
          <DialogTitle>Failed to Load</DialogTitle>
          <DialogContent>
            <ul>
              {dataRequired
                .filter(({ requestState }) => requestState.status === "error")
                .map((data) => (
                  <li key={dataRequired.indexOf(data)}>
                    {capitalize(data.requestState.key)}
                  </li>
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
      )}
    </>
  );
};

export default DataProvider;
