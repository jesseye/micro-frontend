import React from 'react';

import connectApp from '../components/connectApp';

@connectApp(null, {})
export default class Portal extends React.Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'ADD_NAME',
      payload: 'app'
    })
  }

  render() {
    return (
      <app-welcome />
    )
  }
}

