import { FC } from "react";

export interface Expression {
  id: number;
  operand: Operand;
  operator: Operator;
  value: null | any; // TODO: TYPE THIS
}

interface InputWithProps {
  element: FC<any>;
  props: object;
}

export interface Operand {
  name: string;
  label: string;
  operators: Operator[];
  input: InputWithProps;
  transformValue?: (x: any) => string;
}

export interface Operator {
  name: string;
  djangoExpression: string;
}
