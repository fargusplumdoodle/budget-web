import * as React from "react";
import { FunctionComponent, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../store/configureStore";
import { fetchBudgets } from "../store/actions/budgetActions";
import { fetchTags } from "../store/actions/tagActions";

interface ExpectedData {
  fetchRequired: boolean;
  action: () => (dispatch: AppDispatch) => void;
}
interface Props {
  fetchBudgetsRequired: boolean;
  fetchTagsRequired: boolean;
  authenticated: boolean;
}

const InitializeData: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();

  const expectedData: ExpectedData[] = [
    { fetchRequired: props.fetchBudgetsRequired, action: fetchBudgets },
    { fetchRequired: props.fetchTagsRequired, action: fetchTags },
  ];

  useEffect(() => {
    if (!props.authenticated) {
      return;
    }
    expectedData.forEach(async ({ fetchRequired, action }) => {
      if (fetchRequired) {
        await dispatch(action());
      }
    });
  }, [props.authenticated, expectedData]);

  return <></>;
};

function mapStateToProps(state: RootState, ownProps: Object) {
  return {
    authenticated: state.auth.authenticated,
    fetchBudgetsRequired: state.budgets.list.length === 0,
    fetchTagsRequired: state.tags.list.length === 0,
  };
}

export default connect(mapStateToProps)(InitializeData);
