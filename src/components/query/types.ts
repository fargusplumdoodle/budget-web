import { ReactNode } from "react";

export interface Expression<T> {
  id: number;
  operand: Operand<T>;
  operator: Operator<T>;
  value: T;
}

export interface Operand<T> {
  name: string;
  label: string;
  operators: Operator<T>[];

  input: ReactNode;
  requiresSetValueAndExpression: boolean;
  inputLabel: (x: T) => string;
  transformValue?: (x: T) => string[];
}

// eslint-disable-next-line unused-imports/no-unused-vars
export interface Operator<T> {
  name: string;
  djangoExpression: string;
}
