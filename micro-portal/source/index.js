import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import Portal from './app/Portal';

// initialize modules info
window.appModules = {
  modules: {
    app: {
      bundle: './app.bundle.js',
    }
  }
}


const modules = window.appModules.modules;
Promise.all(Object.keys(modules).map(key => {
  const moduleItem = modules[key];
  return fetch(moduleItem.bundle);
})).then((responseList) => {
  // load modules

  Promise.all(responseList.map(res => res.text())).then(codeArray => {
    return codeArray.map(code => eval(code))
  }).then((data) => {
    //creat reducer/store
    const reducers = combineReducers(createReducers());
    const store = createStore(
      reducers,
      compose(applyMiddleware(reduxPromise,reduxThunk ))
    )
    
    if (window.appModules) {
      window.appModules.reduxStore = store;
    }
  }).then(() => {
    // render app
    ReactDOM.render(<Provider store={window.appModules.reduxStore}><Portal /></Provider>, document.getElementById('app'));
  })
})

function createReducers() {
  const appModules = window.appModules && window.appModules.modules ? window.appModules.modules : {};

  const reducers = Object.keys(appModules).reduce((acc, key) => {
    const item = appModules[key];
    Object.assign(acc, item.reducers);
    return acc;
  }, {});

  return reducers;
}
