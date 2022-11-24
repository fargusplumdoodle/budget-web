import { Budget, Tag } from "../../../store";
import cloneDeep from "lodash/cloneDeep";

export const getDefaultTag = (): Tag => {
  return {
    id: null,
    name: "",
    common_budget: null,
    common_transaction_amount: null,
  };
};

export const getDefaultFormValues = (tag: Tag | null) => {
  return tag ? cloneDeep(tag) : getDefaultTag();
};
