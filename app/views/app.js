import React from 'react/addons';
import classnames from 'classnames';
import _ from 'lodash';
import SessionStore from '../stores/session-store.js';
import FacebookStore from '../stores/facebook-store.js'
import SessionActions from '../actions/session-actions.js';
import Header from './components/header.js'
import { RouteHandler } from 'react-router';

let internals = {
  getSessionFromStore() {
    let user = SessionStore.getUser();
    if (_.isEmpty(user)) {
      console.log('Session Init');
      SessionActions.init();
    }

    return {
      user: user,
      facebook: FacebookStore.getFacebook(),
    }
  }
}

let App = React.createClass({

  getInitialState() {
    return _.assign({
      lastTap: 0
    }, internals.getSessionFromStore());
  },

  componentDidMount() {
    SessionStore.addChangeListener(this._onChange);
    FacebookStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
    FacebookStore.removeChangeListener(this._onChange);
  },

  /*
    Mobile double tap muting to prevent unwanted content zoom.
    Instead of adding a markup tag to control content scale which might
    prevent zoom levels on non-mobile
  */
  muteDoubleTap(e) {
    let timeBetweenTaps = e.timeStamp - this.state.lastTap

    if (timeBetweenTaps < 500 && timeBetweenTaps > 0) {
      e.preventDefault()
    }
    this.setState({
      lastTap: e.timeStamp
    })
  },

  render() {
    let componentProps = _.cloneDeep(this.props);

    if (!_.isEmpty(this.state.user)) {
      _.assign(componentProps, this.state);
    }
    let headerProps = _.pluck(componentProps, ['displayName', 'email', 'id']);

    return (
      <div className="content" onTouchEnd={this.muteDoubleTap}>
        <Header {...headerProps} />
        <RouteHandler {...componentProps} />
      </div>
    )
  },

  _onChange() {
    this.setState(internals.getSessionFromStore());
  }
});

export default App;
