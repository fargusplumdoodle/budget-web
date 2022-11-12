import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TransactionsTable from './TransactionsTable';
import {
  createCallback,
  createSampleTransactions,
} from '../../../util/storybook';

export default {
  title: 'Transactions Table',
  component: TransactionsTable,
} as ComponentMeta<typeof TransactionsTable>;

const defaultArgs = {
  transactions: createSampleTransactions(),
  showBudget: true,
  onCreateCallback: createCallback('create'),
  onUpdateCallback: createCallback('update'),
  onDeleteCallback: createCallback('delete'),
};

const Template: ComponentStory<typeof TransactionsTable> = function (args) {
  return <TransactionsTable {...defaultArgs} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  showBudget: true,
};
