import { RootState } from "../store/configureStore";
import budgets from "./budgets";
import tags from "./tags";
import { Provider } from "react-redux";
import { createStore } from "redux";
import merge from "lodash/merge";
import { StoryContext } from "@storybook/react";
import { StoryFnReactReturnType } from "@storybook/react/dist/ts3.9/client/preview/types";

export const stateDecorator = (stateOverrides: Partial<RootState> = {}) => {
  const mockState: Partial<RootState> = {
    budgets: {
      ...budgets,
      root: budgets.byName.root,
      status: "loaded",
    },
    tags: {
      ...tags,
      status: "loaded",
    },
  };
  const state = merge({}, mockState, stateOverrides);

  return (Story: any, {}: StoryContext): StoryFnReactReturnType => {
    const store = createStore((data: any) => data, state);
    return (
      <Provider store={store}>
        <Story />
      </Provider>
    );
  };
};
