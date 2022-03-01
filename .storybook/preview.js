import { SnackbarProvider } from "notistack";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { store } from "../src/store/configureStore";
import { loadBudgetsSuccess } from "../src/store/actions/budgetActions";
import { sampleBudgets, sampleTags } from "./store";
import { loadTagsSuccess } from "../src/store/actions/tagActions";
import { darkTheme } from "../src/app/theme";
import  AppProvider from "../src/app/AppProvider";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const withProvider = (Story) => {
  return (
    <AppProvider>
      <Story />
    </AppProvider>
  );
};

store.dispatch(loadBudgetsSuccess([...sampleBudgets]));
store.dispatch(loadTagsSuccess([...sampleTags]));

export const decorators = [withProvider ];
