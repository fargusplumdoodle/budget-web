import { combineReducers } from 'redux';
import { communicationReducer } from './communication';
import { locationReducer } from './location';
import { transactionReducer } from './data';
import { sessionReducer } from './session';
import budgetReducer from './data/budgets/slice';
import tagReducer from './data/tags/slice';

const rootReducer = combineReducers({
  location: locationReducer,
  data: combineReducers({
    budgets: budgetReducer,
    transactions: transactionReducer,
    tags: tagReducer,
  }),
  session: sessionReducer,
  communication: communicationReducer,
});
export default rootReducer;
