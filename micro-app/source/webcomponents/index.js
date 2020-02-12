import WelcomeTag from './WelcomeTag';

import welcome from '../views/Welcome/redux/reducer';

window.customElements.define('app-welcome', WelcomeTag);

console.log('===========')

function createReducers() {
  const appModules = window.appModules ? window.appModules : {};

  const reducers = Object.keys(appModules).reduce((acc, item) => {
    Object.assign(acc, item.reducers);
  }, {});

  return reducers;
}

if (window.appModules) {
  const reducers = {
    welcome
  };

  window.appModules.modules.app.reducers = reducers;
}



export default [
  {
    name: 'welcome',
    compnent: WelcomeTag,
  }
]
