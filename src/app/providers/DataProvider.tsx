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
import capitalize from "lodash/capitalize";
import {
  fetchAllBudgets,
  fetchAllTags,
  resetAuth,
  selectBudgetFetchRequired,
  selectRequestById,
  selectTagFetchRequired,
} from "../../store";

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
  const tagFetchRequired = useSelector(selectTagFetchRequired);
  const tagRequestState = useSelector(selectRequestById("tag", "retrieve"));

  const dataRequired = useMemo(
    () => [
      {
        fetchRequired: budgetFetchRequired,
        requestState: budgetRequestState,
        action: fetchAllBudgets({}),
      },
      {
        fetchRequired: tagFetchRequired,
        requestState: tagRequestState,
        action: fetchAllTags({}),
      },
    ],
    [budgetRequestState, budgetFetchRequired, tagFetchRequired, tagRequestState]
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
