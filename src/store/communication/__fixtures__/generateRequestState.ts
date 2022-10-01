import { RequestState } from "../types";
import merge from "lodash/merge";

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
