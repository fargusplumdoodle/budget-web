import merge from "lodash/merge";
import { RequestState } from "../types";

const generateRequestState = (args: Partial<RequestState> = {}) =>
  merge(
    {
      key: "transaction",
      action: "create",
      id: "fakeHash",
      status: "loading",
    },
    args
  );

export default generateRequestState;
