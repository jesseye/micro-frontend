import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default function connectApp(handle, actions) {
  const mapStateToProps = (state) => {
    const stateProps = {
      app: state.global,
    }

    if (handle) {
      stateProps[handle] = state[handle] ? state[handle] : {}
    }

    return stateProps;
  }

  const mapDispathToProps = (dispatch) => {
    return { appActions: bindActionCreators(actions, dispatch), dispatch };
  }


  return (Wrapped) => {
    class ConnectedComponent extends React.Component {
      render() {
        return <Wrapped {...this.props} />
      }
    }

    return connect(mapStateToProps, mapDispathToProps)(ConnectedComponent);
  }
}