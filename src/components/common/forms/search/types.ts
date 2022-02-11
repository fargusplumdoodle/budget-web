export interface Expression {
  id: number;
  operand: Operand;
  operator: Operator;
  value: null | any; // TODO: TYPE THIS
}

interface InputWithProps {
  element: any;
  props: object;
}

export interface Operand {
  name: string;
  label: string;
  operators: Operator[];
  input: InputWithProps;
  transformValue?: (x: any) => string[];
  requiresSetValueAndExpression: boolean;
}

export interface Operator {
  name: string;
  djangoExpression: string;
}
