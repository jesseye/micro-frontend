import React from 'react';
import connectApp from '../../components/connectApp';

import actions from './redux/actionCreator';

@connectApp('welcome', actions)
export default class Welcome extends React.Component {
  render() {
    const { name, welcome } = this.props;
    console.log(welcome);
    return <div>Welcome, {welcome.name}</div>
  }
}