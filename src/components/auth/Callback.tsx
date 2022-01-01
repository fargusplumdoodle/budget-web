import * as React from "react";
import { FunctionComponent, useEffect } from "react";
import { connect, useSelector } from "react-redux";
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
  const navigate = useNavigate();

  const authCode = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (!authenticated && authCode) {
      requestAuthToken(authCode).then(() => {
        navigate("/");
      });
    }
  }, [authenticated, authCode, navigate, requestAuthToken]);

  return <h1>Redirecting</h1>;
};

function mapStateToProps(state: RootState, ownProps: Object) {
  return {};
}
const mapDispatchToProps = {
  requestAuthToken,
};
export default connect(mapStateToProps, mapDispatchToProps)(Callback);
