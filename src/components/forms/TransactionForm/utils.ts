import { selectBudgetByName, store, Transaction} from "../../../store";
import cloneDeep from "lodash/cloneDeep";

export const getDefaultTransaction = () => {
  const foodBudget = selectBudgetByName("food")(store.getState());
  return {
    id: null,
    amount: 0,
    description: "",
    budget: foodBudget,
    date: new Date(),
    income: false,
    transfer: false,
    tags: [],
  };
};

export const getDefaultFormValues = (transaction: Transaction | null) => {
  return transaction? cloneDeep(transaction) : getDefaultTransaction();
};
