// Libs
import React from 'react/addons';
import {Navigation} from 'react-router';
import classnames from 'classnames';

// Components
import Spinner from 'react-spinner';
import ControlPanel from '../components/control-panel';
import GameBoard from '../components/game-board';

// Flux
import FacebookStore from '../../stores/facebook-store.js';
import SessionActions from '../../actions/session-actions.js';

let internals = {
  getStateFromStores() {
    return {
      loading: FacebookStore.isLoading()
    }
  }
}

let SlotMachine  = React.createClass({
  mixins: [Navigation],

  propTypes: {
    user: React.PropTypes.object
  },

  getInitialState() {
    return internals.getStateFromStores();
  },

  signOut() {
    SessionActions.logout();
  },

  content() {
    return <p>Finished Loading</p>
  },

  render() {
    let slotsClasses = classnames({
      "inviter row": true,
      "spinner-visible": this.state.loading
    })

    let content = this.state.loading ? <Spinner /> : null;

    return (
      <div className={slotsClasses}>
        {content}
        <div className="col-xs-3">
          <ControlPanel />
        </div>
        <div className="col-xs-9">
          <GameBoard />
        </div>
      </div>
    );
  },

  _onChange() {
    return this.setState(internals.getStateFromStores())
  }
})

export default SlotMachine;
