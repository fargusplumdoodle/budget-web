import { BUDGET_ROOT_NAME } from "../api/constants";
import { modelById, modelByName } from "../store/models/utils";
import { Budget } from "../store/models/types";

const root = {
  id: 0,
  name: BUDGET_ROOT_NAME,
  monthlyAllocation: 0,
  balance: 10 * 1000,
  parent: null,
  parentId: null,
  isNode: true,
  income_per_month: 1000,
  outcome_per_month: 1000,
};

const transportation = {
  id: 1,
  name: "Transportation",
  monthlyAllocation: 500,
  balance: 450,
  parent: root,
  parentId: root.id,
  isNode: true,
  income_per_month: 1000,
  outcome_per_month: 1000,
};

const personal = {
  id: 10,
  name: "Personal",
  monthlyAllocation: 500,
  balance: 450,
  parent: root,
  parentId: root.id,
  isNode: true,
  income_per_month: 1000,
  outcome_per_month: 1000,
};

const car = {
  id: 2,
  name: "Car",
  monthlyAllocation: 100,
  balance: 450,
  parent: transportation,
  parentId: transportation.id,
  isNode: true,
  income_per_month: 1000,
  outcome_per_month: 1000,
};

const bike = {
  id: 3,
  name: "Bike",
  monthlyAllocation: 100,
  balance: 450,
  parent: transportation,
  parentId: transportation.id,
  isNode: false,
  income_per_month: 1000,
  outcome_per_month: 1000,
};

const gas = {
  id: 3,
  name: "Gas",
  monthlyAllocation: 100,
  balance: 450,
  parent: car,
  parentId: car.id,
  isNode: false,
  income_per_month: 1000,
  outcome_per_month: 1000,
};

const carParts = {
  id: 4,
  name: "Car Parts",
  monthlyAllocation: 100,
  balance: 450,
  parent: car,
  parentId: car.id,
  isNode: false,
  income_per_month: 1000,
  outcome_per_month: 1000,
};

const music = {
  id: 11,
  name: "Music",
  monthlyAllocation: 500,
  balance: 450,
  parent: personal,
  parentId: personal.id,
  isNode: false,
  income_per_month: 1000,
  outcome_per_month: 1000,
};

const doritos = {
  id: 11,
  name: "Doritos",
  monthlyAllocation: 500,
  balance: 450,
  parent: personal,
  parentId: personal.id,
  isNode: false,
  income_per_month: 1000,
  outcome_per_month: 1000,
};

const food = {
  id: 12,
  name: "Food",
  monthlyAllocation: 500,
  balance: 450,
  parent: root,
  parentId: root.id,
  isNode: true,
  income_per_month: 1000,
  outcome_per_month: 1000,
};

const groceries = {
  id: 13,
  name: "Groceries",
  monthlyAllocation: 500,
  balance: 450,
  parent: food,
  parentId: food.id,
  isNode: false,
  income_per_month: 1000,
  outcome_per_month: 1000,
};

const restaurant = {
  id: 14,
  name: "Restaurant",
  monthlyAllocation: 500,
  balance: 450,
  parent: food,
  parentId: food.id,
  isNode: false,
  income_per_month: 1000,
  outcome_per_month: 1000,
};

const housing = {
  id: 15,
  name: "Housing",
  monthlyAllocation: 500,
  balance: 450,
  parent: root,
  parentId: root.id,
  isNode: false,
  income_per_month: 1000,
  outcome_per_month: 1000,
};

const list: Budget[] = [
  root,
  transportation,
  gas,
  bike,
  carParts,
  music,
  doritos,
  food,
  restaurant,
  groceries,
  housing,
];

const byId = modelById(list);
const byName = {
  root,
  transportation,
  gas,
  bike,
  carParts,
  music,
  doritos,
  food,
  restaurant,
  groceries,
  housing,
};

const budgets = {
  list,
  byId,
  byName,
};
export default budgets;
