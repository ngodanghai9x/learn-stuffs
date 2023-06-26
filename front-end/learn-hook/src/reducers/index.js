import { combineReducers } from "redux";
import countReducer from './count';

const rootReducer = combineReducers({
  count: countReducer,
});

export default rootReducer;