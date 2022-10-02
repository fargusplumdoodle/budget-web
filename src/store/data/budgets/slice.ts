import { createSlice } from "@reduxjs/toolkit";
import {
  addModelsToList,
  addModelToList,
  allObjectsExcept,
  modelById,
  modelByName,
} from "../../models/utils";
import { Budget, BudgetState } from "./types";
import { BUDGET_ROOT_NAME } from "../../../api/constants";
import { getRootBudget } from "./utils";

export const initialState: BudgetState = {
  status: "init",
  list: [],
  byId: {},
  byName: {},
  root: null,
};

export const sliceKey = "budget";
const budgetSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    loadBudgets(state: BudgetState, action) {
      const budgets = [...(action.payload as Budget[])];
      state.list = addModelsToList(state.list, budgets);
      state.byName = modelByName(state.list);
      state.byId = modelById(state.list);
      state.root = getRootBudget(state.list);
    },
    loadBudget(state: BudgetState, { payload }) {
      const budget: Budget = payload;
      state.list = addModelToList(state.list, budget);
      state.byId[budget.id!] = budget;
      state.byName[budget.name] = budget;

      if (budget.name === BUDGET_ROOT_NAME) {
        state.root = budget;
      }
    },
    createBudget(state, _) {
      return state;
    },
    deleteBudget(state, { payload }) {
      const budget: Budget = payload;
      state.list = [...state.list.filter(allObjectsExcept(budget.id!))];
      delete state.byId[budget.id!];
      delete state.byName[budget.name];
    },
    updateBudget(state, _) {
      return state;
    },
  },
});
export const {
  loadBudgets,
  loadBudget,
  deleteBudget,
  createBudget,
  updateBudget,
} = budgetSlice.actions;
export default budgetSlice.reducer;
