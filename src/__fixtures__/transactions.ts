import { parseISO } from 'date-fns';
import budgets from './budgets';
import { Transaction } from '../store/data/transactions/types';

const transactions: Transaction[] = [
  {
    id: 161053,
    amount: -2788,
    description: '',
    budget: budgets.byName.food,
    date: parseISO('2022-09-17'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 2,
        name: 'restaurant',
        rank: 59,
        common_transaction_amount: -1149,
        common_budget: budgets.byName.food,
      },
    ],
  },
  {
    id: 161051,
    amount: -17459,
    description: '',
    budget: budgets.byName.food,
    date: parseISO('2022-09-15'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 1,
        name: 'groceries',
        rank: 45,
        common_transaction_amount: -209,
        common_budget: budgets.byName.food,
      },
    ],
  },
  {
    id: 161052,
    amount: -4040,
    description: '',
    budget: budgets.byName.carParts,
    date: parseISO('2022-09-15'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 97,
        name: 'Dentist',
        rank: 0,
        common_transaction_amount: null,
        common_budget: null,
      },
    ],
  },
  {
    id: 161056,
    amount: -341409,
    description: '',
    budget: budgets.byName.root,
    date: parseISO('2022-09-15'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 7,
        name: 'income',
        rank: 154,
        common_transaction_amount: 5881,
        common_budget: budgets.byName.root,
      },
    ],
  },
  {
    id: 161037,
    amount: 10000,
    description: 'Sold Novation Launchkey MIDI Keyboard',
    budget: budgets.byName.music,
    date: parseISO('2022-09-14'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 79,
        name: 'Le Purge 2022',
        rank: 3,
        common_transaction_amount: 2000,
        common_budget: budgets.byName.music,
      },
    ],
  },
  {
    id: 161038,
    amount: 16000,
    description: 'Sold Scarpa Climbing shoes',
    budget: budgets.byName.doritos,
    date: parseISO('2022-09-14'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 96,
        name: 'Climbing Shoes',
        rank: 0,
        common_transaction_amount: null,
        common_budget: null,
      },
    ],
  },
  {
    id: 161039,
    amount: 3000,
    description: 'Sold Computer Parts',
    budget: budgets.byName.doritos,
    date: parseISO('2022-09-14'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 79,
        name: 'Le Purge 2022',
        rank: 3,
        common_transaction_amount: 2000,
        common_budget: budgets.byName.doritos,
      },
    ],
  },
  {
    id: 161055,
    amount: -9632,
    description: '',
    budget: budgets.byName.restaurant,
    date: parseISO('2022-09-13'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 19,
        name: 'phone bill',
        rank: 8,
        common_transaction_amount: -12320,
        common_budget: budgets.byName.restaurant,
      },
    ],
  },
  {
    id: 161049,
    amount: -4967,
    description: '',
    budget: budgets.byName.food,
    date: parseISO('2022-09-12'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 1,
        name: 'groceries',
        rank: 45,
        common_transaction_amount: -209,
        common_budget: budgets.byName.food,
      },
    ],
  },
  {
    id: 161050,
    amount: -8959,
    description: 'Games table!!',
    budget: budgets.byName.music,
    date: parseISO('2022-09-12'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 24,
        name: 'household supplies',
        rank: 0,
        common_transaction_amount: null,
        common_budget: null,
      },
    ],
  },
  {
    id: 161054,
    amount: -6500,
    description: '',
    budget: budgets.byName.food,
    date: parseISO('2022-09-12'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 1,
        name: 'groceries',
        rank: 45,
        common_transaction_amount: -209,
        common_budget: budgets.byName.food,
      },
    ],
  },
  {
    id: 161046,
    amount: -5000,
    description: 'Baseball game vancouver',
    budget: budgets.byName.doritos,
    date: parseISO('2022-09-11'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 38,
        name: 'social',
        rank: 0,
        common_transaction_amount: null,
        common_budget: null,
      },
    ],
  },
  {
    id: 161047,
    amount: -367,
    description: '',
    budget: budgets.byName.food,
    date: parseISO('2022-09-11'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 2,
        name: 'restaurant',
        rank: 59,
        common_transaction_amount: -1149,
        common_budget: budgets.byName.food,
      },
    ],
  },
  {
    id: 161048,
    amount: -1845,
    description: '',
    budget: budgets.byName.gas,
    date: parseISO('2022-09-11'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 56,
        name: 'ferry',
        rank: 1,
        common_transaction_amount: -11530,
        common_budget: budgets.byName.gas,
      },
    ],
  },
  {
    id: 161042,
    amount: -1845,
    description: '',
    budget: budgets.byName.gas,
    date: parseISO('2022-09-09'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 56,
        name: 'ferry',
        rank: 1,
        common_transaction_amount: -11530,
        common_budget: budgets.byName.gas,
      },
    ],
  },
  {
    id: 161043,
    amount: -367,
    description: '',
    budget: budgets.byName.food,
    date: parseISO('2022-09-09'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 2,
        name: 'restaurant',
        rank: 59,
        common_transaction_amount: -1149,
        common_budget: budgets.byName.food,
      },
    ],
  },
  {
    id: 161044,
    amount: -3276,
    description: 'THE CHICKPEA VANCOUVER',
    budget: budgets.byName.food,
    date: parseISO('2022-09-09'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 2,
        name: 'restaurant',
        rank: 59,
        common_transaction_amount: -1149,
        common_budget: budgets.byName.food,
      },
    ],
  },
  {
    id: 161045,
    amount: -1291,
    description: 'Icecream vancouver',
    budget: budgets.byName.food,
    date: parseISO('2022-09-09'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 2,
        name: 'restaurant',
        rank: 59,
        common_transaction_amount: -1149,
        common_budget: budgets.byName.food,
      },
    ],
  },
  {
    id: 156132,
    amount: -4000,
    description: '',
    budget: budgets.byName.gas,
    date: parseISO('2022-09-06'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 30,
        name: 'parking',
        rank: 14,
        common_transaction_amount: -2000,
        common_budget: budgets.byName.gas,
      },
    ],
  },
  {
    id: 156133,
    amount: -1389,
    description: '',
    budget: budgets.byName.food,
    date: parseISO('2022-09-06'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 91,
        name: 'lunch',
        rank: 3,
        common_transaction_amount: -1389,
        common_budget: budgets.byName.food,
      },
    ],
  },
  {
    id: 156134,
    amount: -10151,
    description: '',
    budget: budgets.byName.housing,
    date: parseISO('2022-09-06'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 23,
        name: 'power',
        rank: 1,
        common_transaction_amount: -10151,
        common_budget: budgets.byName.housing,
      },
    ],
  },
  {
    id: 156135,
    amount: -9291,
    description: '',
    budget: budgets.byName.housing,
    date: parseISO('2022-09-06'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 22,
        name: 'internet',
        rank: 6,
        common_transaction_amount: -9291,
        common_budget: budgets.byName.housing,
      },
    ],
  },
  {
    id: 161041,
    amount: -452,
    description: '',
    budget: budgets.byName.doritos,
    date: parseISO('2022-09-06'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 40,
        name: 'credit card fees',
        rank: 2,
        common_transaction_amount: -528,
        common_budget: budgets.byName.doritos,
      },
    ],
  },
  {
    id: 156131,
    amount: -4140,
    description: '',
    budget: budgets.byName.food,
    date: parseISO('2022-09-05'),
    income: false,
    transfer: false,
    tags: [
      {
        id: 48,
        name: 'date',
        rank: 12,
        common_transaction_amount: -4430,
        common_budget: budgets.byName.food,
      },
    ],
  },
];

export default transactions;
