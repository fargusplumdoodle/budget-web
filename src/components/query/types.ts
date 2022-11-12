import { FunctionComponent } from 'react';

export type ExpressionInputProps<T> = {
  value: T;
  onChange: (value: T) => void;
};

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

  input: FunctionComponent<ExpressionInputProps<T>>;
  requiresSetValueAndExpression: boolean;
  inputLabel: (x: T) => string;
  transformValue?: (x: T) => string[];
  getDefaultValue: () => T;
}

// eslint-disable-next-line unused-imports/no-unused-vars
export interface Operator<T> {
  name: string;
  djangoExpression: string;
}
