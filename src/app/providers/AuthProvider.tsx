import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { FunctionComponent, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AuthButton from "../../components/auth/AuthButton";
import { ROUTES } from "../AppRoutes";
import InitLoading from "../../components/InitLoading";
import { requestAuthToken, resetAuth, selectAuthState } from "../../store";

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const auth = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (auth.authenticated || location.pathname !== ROUTES.AUTH_CALLBACK.path)
      return;

    const authCode = new URLSearchParams(window.location.search).get("code");

    if (authCode && auth.status === "init") {
      dispatch(requestAuthToken({ ...auth, authCode }));
    }
    if (auth.status === "error") {
      dispatch(resetAuth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.authenticated, location.pathname]);

  return (
    <>
      {auth.authenticated ? children : <InitLoading message={auth.status} />}
      <Dialog open={auth.status === "error" || auth.status === "init"}>
        <DialogTitle>You are not authenticated</DialogTitle>
        <DialogActions>
          <AuthButton sx={{ m: 1 }} />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AuthProvider;
