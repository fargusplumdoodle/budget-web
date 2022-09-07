import { StateStatus, StateType } from "../types/stateTypes";

export function updateStatus(stateType: StateType, status: StateStatus) {
  return {
    type: `UPDATE_${stateType}_STATUS`,
    payload: status,
  };
}
