// @flow

import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import stats, { type STATS_STATE } from "./stats";
const rootReducer = combineReducers({
  stats
});

let composer = null;

if (process.env.NODE_ENV !== "production") {
  composer = composeWithDevTools;
} else {
  composer = compose;
}

export type STORE_STATE = {
  stats: STATS_STATE
};

const store = createStore(rootReducer, composer(applyMiddleware(thunk)));

export default store;
