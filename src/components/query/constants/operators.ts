import { Operator } from '../types';

export const OPERATORS: { [name: string]: Operator<any> } = {
  greaterThan: {
    name: '>',
    djangoExpression: '__gt',
  },
  lessThan: {
    name: '<',
    djangoExpression: '__lt',
  },
  lessThanEqual: {
    name: '<=',
    djangoExpression: '__lte',
  },
  greaterThanEqual: {
    name: '>=',
    djangoExpression: '__gte',
  },
  equal: {
    name: '==',
    djangoExpression: '',
  },
  icontains: {
    name: 'icontains',
    djangoExpression: '__icontains',
  },
  iexact: {
    name: 'iexact',
    djangoExpression: '__iexact',
  },
  includes: {
    name: 'includes',
    djangoExpression: '__includes',
  },
  excludes: {
    name: 'excludes',
    djangoExpression: '__excludes',
  },
  none: {
    name: 'none',
    djangoExpression: '__none',
  },
};

export const numericalOperators = [
  OPERATORS.greaterThan,
  OPERATORS.lessThan,
  OPERATORS.greaterThanEqual,
  OPERATORS.lessThanEqual,
  OPERATORS.equal,
];
export const textOperators = [OPERATORS.icontains, OPERATORS.iexact];
export const listOperators = [OPERATORS.includes, OPERATORS.excludes];
