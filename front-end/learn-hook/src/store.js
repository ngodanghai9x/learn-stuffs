import { configureStore } from "@reduxjs/toolkit";
import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// const logger = createLogger();

// 1
// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
//   applyMiddleware(logger, thunk),
// );

// 2
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const enhancer = composeEnhancers(
//   applyMiddleware(
//     thunk,
//   ),
//   // other store enhancers if any
// );
// const store = createStore(myReducer, enhancer);

// 3
const store = configureStore({
  reducer: rootReducer,
});

export default store;