import { State, StateType } from "../types/stateTypes";

export function updateStatus(stateType: StateType, status: State) {
  return {
    type: `UPDATE_${stateType}_STATUS`,
    payload: status,
  };
}
