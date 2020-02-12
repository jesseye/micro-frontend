import { combineReducers } from 'redux';


function createReducers() {
  const appModules = window.appModules && window.appModules.modules ? window.appModules.modules : {};

  const reducers = Object.keys(appModules).reduce((acc, item) => {
    Object.assign(acc, item.reducers);
  }, {});

  return reducers;
}

const reducers = createReducers();

export default combineReducers(reducers);