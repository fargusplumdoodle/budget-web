import { Transaction } from "../store/data/transactions/types";

export function formatCurrency(
  amount: number,
  showCents: boolean = true,
  showDollarSign: boolean = true
): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: showCents ? 2 : 0,
    ...(showDollarSign && {
      currency: "USD",
      style: "currency",
    }),
  }).format(amount);
}

export function commaSeparatedTagNames(trans: Transaction) {
  return trans.tags.map((tag) => tag.name).join(", ");
}
