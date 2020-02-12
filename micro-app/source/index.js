import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Welcome from './views/Welcome';
import store from './app/appStore';

export default class Hello extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Welcome />
      </Provider>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('app'));