import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { requestAuthToken } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";

interface OwnProps {
  requestAuthToken: Function;
}
type Props = OwnProps;

const Callback: FunctionComponent<Props> = ({ requestAuthToken }) => {
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authCode = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (!authenticated && authCode) {
      // TODO: HANDLE FAILURES
      dispatch(requestAuthToken(authCode));
      navigate("/");
    }
  }, []);

  if (!authenticated) {
    // TODO: HANDLE FAILURES
    // dispatch(requestAuthToken(authCode));
    // navigate("/");
    // AuthAPI.retrieveToken(authCode)
    //   .then((authState) => {
    //     this.props.setToken(authState);
    //
    //     // window.location.assign('/')
    //   })
    //   .catch((err) => {
    //     if (err.response) {
    //       setMessage(`Error:\n${JSON.stringify(err.response.data)}`);
    //     } else {
    //       setMessage(`Error:\n${err}`);
    //     }
    //   });
  }

  return <h1>Redirecting</h1>;
};

function mapStateToProps(state: RootState, ownProps: Object) {
  return {};
}
const mapDispatchToProps = {
  requestAuthToken,
};
export default connect(mapStateToProps, mapDispatchToProps)(Callback);
