export interface Expression {
  id: number;
  operand: Operand;
  operator: Operator;
  value: null | any; // TODO: TYPE THIS
}

export interface Operand {
  name: string;
  label: string;
  operators: Operator[];
}

export interface Operator {
  name: string;
  input: any; // TODO: MAKE A REACT ELEMENT
  djangoExpression: string;
}
