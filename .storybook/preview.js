import { SnackbarProvider } from "notistack";
import { darkTheme } from "../src/app/theme";
import { ThemeProvider } from "@mui/material";
import { store } from "../src/store/configureStore";
import { Provider } from "react-redux";
import { loadBudgetsSuccess } from "../src/store/actions/budgetActions";
import {sampleBudgets, sampleTags} from "./store";
import { loadTagsSuccess } from "../src/store/actions/tagActions";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const withSnackBar = (Story) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Story />
    </SnackbarProvider>
  );
};

const withDarkTheme = (Story) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Story />
    </ThemeProvider>
  );
};

const withProvider = (Story) => {
  return (
    <Provider store={store}>
      <Story />
    </Provider>
  );
};

store.dispatch(loadBudgetsSuccess([...sampleBudgets]));
store.dispatch(loadTagsSuccess([...sampleTags]));

export const decorators = [withProvider, withDarkTheme, withSnackBar];
