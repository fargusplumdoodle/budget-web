import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/configureStore";
import { fetchBudgets } from "../store/actions/budgetActions";
import { fetchTags } from "../store/actions/tagActions";
import { ProviderContext, withSnackbar } from "notistack";
import initialState from "../store/initialState";
import { fetchUserInfo } from "../store/actions/userInfoActions";
import { isEqual } from "lodash";
import { ROUTES } from "./AppRoutes";
import {
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import AuthButton from "../components/auth/AuthButton";

interface ExpectedData {
  fetchRequired: boolean;
  action: () => (dispatch: AppDispatch) => void;
  name: string;
}
interface Props extends ProviderContext {
  fetchBudgetsRequired: boolean;
  fetchTagsRequired: boolean;
  fetchUserInfoRequired: boolean;
  authenticated: boolean;
}

const InitializeData: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);

  if (
    !props.authenticated &&
    window.location.pathname !== ROUTES.AUTH_CALLBACK.path &&
    !needsAuth
  ) {
    setNeedsAuth(true);
  }

  useEffect(() => {
    if (!props.authenticated || loading) {
      return;
    }
    const expectedData: ExpectedData[] = [
      {
        fetchRequired: props.fetchBudgetsRequired,
        action: fetchBudgets,
        name: "Budgets",
      },
      {
        fetchRequired: props.fetchTagsRequired,
        action: fetchTags,
        name: "Tags",
      },
      {
        fetchRequired: props.fetchUserInfoRequired,
        action: fetchUserInfo,
        name: "User Info",
      },
    ];

    setLoading(true);
    expectedData.forEach(async ({ fetchRequired, action, name }) => {
      if (fetchRequired) {
        await dispatch(action());
        props.enqueueSnackbar(`Fetching ${name}`);
      }
    });
  }, [loading, dispatch, props]);

  return (
    <Dialog open={needsAuth}>
      <DialogTitle>You are not authenticated</DialogTitle>
      <DialogActions>
        <AuthButton sx={{m: 1}} />
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state: RootState) {
  return {
    authenticated: state.auth.authenticated,
    fetchBudgetsRequired: state.budgets.list.length === 0,
    fetchTagsRequired: state.tags.list.length === 0,
    fetchUserInfoRequired: isEqual(state.userInfo, initialState.userInfo),
  };
}

export default connect(mapStateToProps)(withSnackbar(InitializeData));
