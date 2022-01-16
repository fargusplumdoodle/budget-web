import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/configureStore";
import { fetchBudgets } from "../store/actions/budgetActions";
import { fetchTags } from "../store/actions/tagActions";
import { ProviderContext, withSnackbar } from "notistack";

interface ExpectedData {
  fetchRequired: boolean;
  action: () => (dispatch: AppDispatch) => void;
  name: string;
}
interface Props extends ProviderContext {
  fetchBudgetsRequired: boolean;
  fetchTagsRequired: boolean;
  authenticated: boolean;
}

const InitializeData: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const expectedData: ExpectedData[] = [
    {
      fetchRequired: props.fetchBudgetsRequired,
      action: fetchBudgets,
      name: "Budgets",
    },
    { fetchRequired: props.fetchTagsRequired, action: fetchTags, name: "Tags" },
  ];

  useEffect(() => {
    if (!props.authenticated || loading) {
      return;
    }
    setLoading(true);
    expectedData.forEach(async ({ fetchRequired, action, name }) => {
      if (fetchRequired) {
        await dispatch(action());
        props.enqueueSnackbar(`Fetching ${name}`);
      }
    });
  }, [props.authenticated, expectedData, loading]);

  return <></>;
};

function mapStateToProps(state: RootState, ownProps: Object) {
  return {
    authenticated: state.auth.authenticated,
    fetchBudgetsRequired: state.budgets.list.length === 0,
    fetchTagsRequired: state.tags.list.length === 0,
  };
}

export default connect(mapStateToProps)(withSnackbar(InitializeData));
