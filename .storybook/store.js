import { generateTestBudget, generateTestTag } from "../src/util/generators";

export const sampleBudgets = [
  generateTestBudget({ name: "housing", percentage: 41 }),
  generateTestBudget({ name: "food", percentage: 22 }),
  generateTestBudget({ name: "debt", percentage: 11 }),
  generateTestBudget({ name: "transportation", percentage: 6 }),
  generateTestBudget({ name: "savings", percentage: 6 }),
  generateTestBudget({ name: "personal", percentage: 5 }),
  generateTestBudget({ name: "phone", percentage: 3 }),
  generateTestBudget({ name: "health", percentage: 2 }),
  generateTestBudget({ name: "charity", percentage: 1 }),
  generateTestBudget({ name: "camping", percentage: 1 }),
  generateTestBudget({ name: "server", percentage: 1 }),
  generateTestBudget({ name: "clothing", percentage: 1 }),
];
export const sampleTags = [
  generateTestTag("income"),
  generateTestTag("transfer"),
  generateTestTag("gas"),
  generateTestTag("bike"),
  generateTestTag("doritos"),
];
