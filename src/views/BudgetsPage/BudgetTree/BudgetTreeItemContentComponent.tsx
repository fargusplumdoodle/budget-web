// @ts-nocheck
import { TreeItemContentProps, useTreeItem } from "@mui/lab";
import React from "react";
import clsx from "clsx";
import { Grid, Typography } from "@mui/material";
import capitalize from "lodash/capitalize";
import { BUDGET_STATS_TABLE_WIDTH } from "./constants";
import BudgetTreeTableValue from "./BudgetTreeTableValue";
import BudgetMenuOptions from "./BudgetMenuOptions";

interface Props extends TreeItemContentProps {
  allocated: number | null;
  averageSpent: number | null;
  spent: number;
  balance: number;
  budgetName: string;
}

/**
 * Most of this is copied and pasted from MUI
 *
 * Unfortunately there is this issue with the default
 * tree view were there is no way to have buttons on
 * the tree items that don't trigger the "expand" event
 * and their own event at the same time.
 *
 * This ensures you can click the "more" icon without
 * collapsing/expanding the node
 *
 * Also! They didn't typescript-proof this stuff and there isn't
 * a way of adding ts ignore in JSX so we have to disable typescript
 * checking for this whole file..........
 */

const BudgetTreeItemContentComponent = React.forwardRef<any, Props>(
  (props, ref) => {
    const {
      classes,
      className,
      displayIcon,
      expansionIcon,
      icon: iconProp,
      nodeId,
      onClick,

      // My props
      budgetName,
      allocated,
      averageSpent,
      spent,
      balance,
      ...other
    } = props;

    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const handleClick = (event: any) => {
      handleExpansion(event);
      handleSelection(event);

      if (onClick) {
        onClick(event);
      }
    };

    // @ts-ignore
    return (
      <div
        ref={ref}
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        {...other}
      >
        <div className={classes.iconContainer} onClick={handleClick}>
          {icon}
        </div>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0.5,
            pr: 0,
          }}
          justifyContent="space-between"
          direction="row"
          wrap="nowrap"
          onClick={handleClick}
        >
          <Grid
            item
            component={Typography}
            variant="body2"
            sx={{ flexGrow: 1, paddingRight: 1 }}
          >
            {capitalize(budgetName)}
          </Grid>
          <Grid
            item
            container
            justifyContent="space-evenly"
            wrap="nowrap"
            sx={(theme) => ({
              width: BUDGET_STATS_TABLE_WIDTH,
              [theme.breakpoints.down("sm")]: {
                width: "auto",
                justifyContent: "flex-end",
              },
            })}
          >
            <BudgetTreeTableValue value={allocated} hideOnSmallScreen />
            <BudgetTreeTableValue value={averageSpent} hideOnSmallScreen />
            <BudgetTreeTableValue value={spent} hideOnSmallScreen />
            <BudgetTreeTableValue value={balance} />
          </Grid>
        </Grid>
        <Grid
          item
          component={BudgetMenuOptions}
          aria-label="budget options menu"
          budgetName={budgetName}
        />
      </div>
    );
  }
);

export default BudgetTreeItemContentComponent;
