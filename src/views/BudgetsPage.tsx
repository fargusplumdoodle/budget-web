import * as React from "react";
import { Card, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabPanel, tabProps } from "../components/common/tabs";
import BudgetPercentages from "../components/common/forms/budgets/percentages/BudgetPercentages";

const tabs = {
  percentages: 0,
};

const classes = {
  root: {
    m: 1,
    p: 1,
  },
};

const BudgetsPage: React.FC = function () {
  const [tab, setTab] = useState<number>(tabs.percentages);

  const handleTabChange = (_: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };
  return (
    <>
      <Card sx={classes.root}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Tab label="Percentages" {...tabProps(tabs.percentages)} />
        </Tabs>

        <TabPanel value={tab} index={tabs.percentages}>
          <BudgetPercentages />
        </TabPanel>
      </Card>
    </>
  );
};

export default BudgetsPage;
