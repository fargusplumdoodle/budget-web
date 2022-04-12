import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import AuthButton from "../components/auth/AuthButton";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { ROUTES } from "./AppRoutes";
import InitLoading from "../components/InitLoading";
import { clearAuthToken, requestAuthToken } from "../store/actions/authActions";

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [needsAuth, setNeedsAuth] = useState(false);
  const authCode = new URLSearchParams(window.location.search).get("code");
  const dispatch = useDispatch();

  if (
    !auth.authenticated &&
    window.location.pathname !== ROUTES.AUTH_CALLBACK.path &&
    !needsAuth
  ) {
    setNeedsAuth(true);
  }

  useEffect(() => {
    if (!auth.authenticated && authCode && auth.status === "init") {
      dispatch(requestAuthToken(authCode));
    }

    if (auth.status === "error") {
      dispatch(clearAuthToken());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.authenticated, authCode]);

  return (
    <>
      {auth.authenticated ? children : <InitLoading message={auth.status} />}
      <Dialog open={needsAuth}>
        <DialogTitle>You are not authenticated</DialogTitle>
        <DialogActions>
          <AuthButton sx={{ m: 1 }} />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AuthProvider;
