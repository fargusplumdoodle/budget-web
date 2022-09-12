import {
  createIncomeTransactions,
  getIncomeTransactionAmount,
  getUnallocatedAmount,
} from "./income";
import { loadBudgetsSuccess } from "../store/actions/budgetActions";
import { generateTestBudget, generateTestTag } from "./generators";
import { loadTagsSuccess } from "../store/actions/tagActions";
import { store } from "../store/configureStore";
import { clearAuthToken } from "../store/actions/authActions";
import { IncomeFormData } from "../components/forms/transaction/IncomeForm";

describe("Test create income", () => {
  beforeEach(() => {
    // Resets the store
    store.dispatch(clearAuthToken());
  });
  afterEach(() => {
    // Resets the store
    store.dispatch(clearAuthToken());
  });

  test("that transaction amounts are created correctly", () => {
    expect(getIncomeTransactionAmount(100, 1)).toStrictEqual(1.0);
    expect(getIncomeTransactionAmount(104.34, 33)).toStrictEqual(34.43);
  });

  /**
   * Its not guaranteed that the income will divide perfectly into all of the budgets.
   * So the leftover will be added to a new transaction going into the "savings" budget
   */
  test("that left over transaction amount is poured into savings", () => {
    const transactionsAmounts = [33.33, 33.33];
    const totalAmount = 100;

    expect(
      getUnallocatedAmount(totalAmount, transactionsAmounts)
    ).toStrictEqual(33.34);
  });

  test("that income works", () => {
    const savings = generateTestBudget({
      monthlyAllocation: 0,
      name: "savings",
    });
    const budget1 = generateTestBudget({ monthlyAllocation: 33 });
    const budget2 = generateTestBudget({ monthlyAllocation: 33 });

    store.dispatch(loadBudgetsSuccess([budget1, budget2, savings]));
    store.dispatch(loadTagsSuccess([generateTestTag({ name: "income" })]));

    const incomeFormData: IncomeFormData = {
      amount: 100,
      description: "optional description",
      date: new Date(),
    };

    const transactions = createIncomeTransactions(incomeFormData);

    expect(transactions.length).toEqual(3);

    const incomeTransactions = transactions.filter((t) => t.amount === 33);
    const savingsTransaction = transactions.find((t) => t.amount === 34);

    expect(incomeTransactions.length).toEqual(2);

    transactions.forEach((t) => {
      expect(t.date).toStrictEqual(incomeFormData.date);
      expect(t.income).toEqual(true);
      expect(t.id).toBeNull();
      expect(t.transfer).toEqual(false);
      expect(t.tags.length).toEqual(1);
      expect(t.tags[0].name).toEqual("income");
    });

    expect(savingsTransaction!.description).toBe(
      "unallocatable income dollars"
    );
    expect(savingsTransaction!.budget).toStrictEqual(savings);

    incomeTransactions.forEach((t) => {
      expect(t.description).toStrictEqual(incomeFormData.description);
    });
    const uniqueBudgetsFromIncomeTransactions = new Set(
      incomeTransactions.map((t) => t.budget)
    );
    expect(uniqueBudgetsFromIncomeTransactions).toStrictEqual(
      new Set([budget1, budget2])
    );
  });
});
