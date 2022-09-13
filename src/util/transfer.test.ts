import { loadBudgetsSuccess } from "../store/actions/budgetActions";
import { generateTestBudget, generateTestTag } from "./generators";
import { loadTagsSuccess } from "../store/actions/tagActions";
import { store } from "../store/configureStore";
import { clearAuthToken } from "../store/actions/authActions";
import { TransferFormData } from "../components/forms/transaction_legacy/TransferForm";
import { createTransferTransactions } from "./transfer";
import { Transaction } from "../store/models/types";

describe("Test create transfer transactions", () => {
  const budget1 = generateTestBudget();
  const budget2 = generateTestBudget();
  const transferTag = generateTestTag({ name: "transfer" });

  beforeEach(() => {
    // Resets the store
    store.dispatch(clearAuthToken());
    store.dispatch(loadBudgetsSuccess([budget1, budget2]));
    store.dispatch(loadTagsSuccess([transferTag]));
  });

  afterEach(() => {
    // Resets the store
    store.dispatch(clearAuthToken());
  });

  test("that transaction amounts and budgets are created correctly", () => {
    const formData: TransferFormData = {
      amount: 10,
      description: "some description",
      date: new Date(),
      fromBudget: budget1,
      toBudget: budget2,
    };
    const transactions = createTransferTransactions(formData);

    transactions.forEach((trans) => {
      expect(trans.description).toBe(formData.description);
      expect(trans.date).toBe(formData.date);
      expect(trans.income).toBe(false);
      expect(trans.transfer).toBe(true);
      expect(trans.id).toBeNull();
      expect(trans.tags).toStrictEqual([transferTag]);
    });

    const fromBudgetFinder = (t: Transaction) =>
      t.budget.id === budget1.id && t.amount === -10;
    const toBudgetFinder = (t: Transaction) =>
      t.budget.id === budget2.id && t.amount === 10;

    expect(transactions.find(fromBudgetFinder)).toBeTruthy();
    expect(transactions.find(toBudgetFinder)).toBeTruthy();
  });
});
