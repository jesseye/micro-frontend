import { createStore, applyMiddleware, compose } from 'redux';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import combineReducers from './appReducer';

const composeEnhancer = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const store = createStore(
  combineReducers,
  composeEnhancer(applyMiddleware(reduxPromise,reduxThunk ))
)

export default store;