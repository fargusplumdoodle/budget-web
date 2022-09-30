import {Transaction} from "./types";

export const getTransactionHash = (transaction: Transaction): string => {
    const message = `
  ${transaction.id || ""}
  ${transaction.amount}
  ${transaction.description}
  ${transaction.date}
  ${transaction.income}
  ${transaction.transfer}
  `;
    return sha1(message);
};