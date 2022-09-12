import { generateTestBudget, generateTestTag } from "../src/util/generators";

export const sampleBudgets = [
  generateTestBudget({ name: "housing", monthlyAllocation: 410 }),
  generateTestBudget({ name: "food", monthlyAllocation: 220 }),
  generateTestBudget({ name: "debt", monthlyAllocation: 110 }),
  generateTestBudget({ name: "transportation", monthlyAllocation: 60 }),
  generateTestBudget({ name: "savings", monthlyAllocation: 60 }),
  generateTestBudget({ name: "personal", monthlyAllocation: 50 }),
  generateTestBudget({ name: "phone", monthlyAllocation: 30 }),
  generateTestBudget({ name: "health", monthlyAllocation: 20 }),
  generateTestBudget({ name: "charity", monthlyAllocation: 10 }),
  generateTestBudget({ name: "camping", monthlyAllocation: 10 }),
  generateTestBudget({ name: "server", monthlyAllocation: 10 }),
  generateTestBudget({ name: "clothing", monthlyAllocation: 10 }),
];
export const sampleTags = [
  generateTestTag("income"),
  generateTestTag("paycheque"),
  generateTestTag("transfer"),
  generateTestTag("gas"),
  generateTestTag("bike"),
  generateTestTag("doritos"),
];
