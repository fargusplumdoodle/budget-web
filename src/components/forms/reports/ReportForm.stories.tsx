import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mui/material';
import { DateTime } from 'luxon';
import { createCallback } from '../../../util/storybook';
import ReportForm from './ReportForm';

export default {
  title: 'Report Form',
  component: ReportForm,
} as ComponentMeta<typeof ReportForm>;

const defaultArgs = {
  hideTimebucketSelector: false,
  hideDateLte: false,

  defaultTimebucketSize: 'one_week',
  defaultDateGte: DateTime.now().minus({ months: 6 }),

  onSubmit: createCallback('create'),
};

const Template: ComponentStory<typeof ReportForm> = function (args) {
  return (
    <Box sx={{ maxWidth: 470, p: 2, borderWidth: 'thin' }}>
      <ReportForm {...defaultArgs} {...args} />
      <ReportForm {...defaultArgs} hideTimebucketSelector {...args} />
      <ReportForm {...defaultArgs} hideDateLte {...args} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  // @ts-ignore
  showBudget: true,
};
