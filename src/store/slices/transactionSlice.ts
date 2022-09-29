import { Transaction } from "../models/types";
import {StateStatus} from "../types/stateTypes";
import {createSlice} from "@reduxjs/toolkit";

export interface TransactionState {
    list: Transaction[];
    byId: { [k: number]: Transaction };
    stateStatus: {
        [hash: string]: StateStatus;
    };
}
export const initialState : TransactionState= {
    list: [],
    byId: {},
    stateStatus: {},
}

export const sliceKey = 'transaction'
const transactionSlice = createSlice({
    name: sliceKey,
    initialState,
    reducers: {

    }
})
export const {} = transactionSlice.actions
export default transactionSlice.reducer