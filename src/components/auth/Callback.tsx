import * as React from "react";
import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InitLoading from "../InitLoading";

const Callback: FunctionComponent = () => {
  const navigate = useNavigate();

  useEffect(() => navigate("/"));
  return <InitLoading message="Auth Success"></InitLoading>;
};

export default Callback;
