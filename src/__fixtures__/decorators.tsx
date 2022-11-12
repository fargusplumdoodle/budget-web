import { Provider } from "react-redux";
import { createStore } from "redux";
import merge from "lodash/merge";
import { StoryFnReactReturnType } from "@storybook/react/dist/ts3.9/client/preview/types";
import tags from "./tags";
import budgets from "./budgets";
import { RootState } from "../store";

export const stateDecorator = (stateOverrides: Partial<RootState> = {}) => {
  const mockState: any = {
    data: {
      budgets,
      tags,
    },
  };
  const state = merge({}, mockState, stateOverrides);

  return function (Story: any): StoryFnReactReturnType {
    const store = createStore((data: any) => data, state);
    return (
      <Provider store={store}>
        <Story />
      </Provider>
    );
  };
};
