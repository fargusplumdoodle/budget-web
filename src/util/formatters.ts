import { Transaction } from "../store/data/transactions/types";

export function formatCurrency(
  amount: number,
  showCents: boolean = true
): string {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(amount);
}

export function commaSeparatedTagNames(trans: Transaction) {
  return trans.tags.map((tag) => tag.name).join(", ");
}
