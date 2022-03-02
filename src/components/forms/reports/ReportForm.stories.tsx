import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { createCallback } from "../../../util/storybook";
import ReportForm from "./ReportForm";
import { Box } from "@mui/material";
import { DateTime } from "luxon";

export default {
  title: "Report Form",
  component: ReportForm,
} as ComponentMeta<typeof ReportForm>;

const defaultArgs = {
  hideTimebucketSelector: false,
  hideDateLte: false,

  defaultTimebucketSize: "one_week",
  defaultDateGte: DateTime.now().minus({ months: 6 }),

  onSubmit: createCallback("create"),
};

const Template: ComponentStory<typeof ReportForm> = function (args) {
  return (
    <Box sx={{ maxWidth: 470, p: 2, borderWidth: 'thin'}}>
      <ReportForm {...defaultArgs} {...args} />
      <ReportForm {...defaultArgs} hideTimebucketSelector {...args} />
      <ReportForm {...defaultArgs} hideDateLte {...args} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  showBudget: true,
};
