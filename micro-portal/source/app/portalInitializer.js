import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';

window.appModules = {
  modules: {
    app: {
      bundle: './app.bundle.js',
    }
  }
}

const modules = window.appModules.modules;
Promise.all(Object.keys(modules).map(key => {
  const module = modules[key];
  return fetch(module.bundle);
}))

function createReducers() {
  const appModules = window.appModules && window.appModules.modules ? window.appModules.modules : {};

  const reducers = Object.keys(appModules).reduce((acc, item) => {
    Object.assign(acc, item.reducers);
  }, {});

  return reducers;
}


export default store;
