import { CommunicationState, RequestState } from "../types";
import reducer, { makeRequest, updateRequestStatus } from "../slice";

describe("Communication reducer", () => {
  const getRequest = (): RequestState => ({
    id: 1,
    action: "create",
    status: "loading",
    key: "transaction",
  });
  const getState = (): CommunicationState => ({
    1: getRequest(),
  });

  it("should add request to state", () => {
    const action = makeRequest(getRequest());
    const nextState = reducer({}, action);
    expect(nextState).toEqual(getState());
  });

  it("should override existing request", () => {
    const requestState: RequestState = { ...getRequest(), action: "delete" };
    const action = makeRequest(requestState);
    const state = getState();
    const nextState = reducer(state, action);

    expect(nextState[requestState.id]).toEqual(requestState);
  });

  it("should update the request status", () => {
    const state = getState();
    const action = updateRequestStatus({ id: 1, status: "loaded" });
    const nextState = reducer(state, action);

    expect(nextState).toEqual({ 1: { ...state[1], status: "loaded" } });
  });
});
