import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import Welcome from '@views/Welcome';

class WelcomeTag extends HTMLElement {
  constructor(props) {
    super(props);
  }

  connectedCallback() {

    const store = window.appModules && window.appModules.reduxStore ? window.appModules.reduxStore : {}
  
    console.log(store);
    ReactDOM.render((
      <Provider store={store}>
        <Welcome />
      </Provider>
    ), document.getElementById('app'));
  }
}

export default WelcomeTag;