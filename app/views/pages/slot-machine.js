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
import ReelsStore from '../../stores/reels-store.js';
import SessionActions from '../../actions/session-actions.js';

// Utils
import CoffeeslotsConfig from '../../utils/coffee-slots-config';

let internals = {
  getStateFromStores() {
    return {
      loading: FacebookStore.isLoading(),
      spinning: ReelsStore.isSpinning(),
      speed: ReelsStore.getSpinSpeed(),
      targetIndexes: ReelsStore.getTargetIndexes(),
      winner: ReelsStore.isWinner()
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

  componentDidMount() {
    ReelsStore.addChangeListener(this._onChange)
  },

  componentWillUnmount() {
    ReelsStore.removeChangeListener(this._onChange)
  },

  render() {
    let slotsClasses = classnames({
      "slot-machine row": true,
      "spinner-visible": this.state.loading
    })

    let content = this.state.loading ? <Spinner /> : null;

    return (
      <div className={slotsClasses}>
        {content}
        <div className="col-xs-6 fh">
          <ControlPanel {...this.state} />
        </div>
        <div className="col-xs-6 fh">
          <GameBoard {...this.state} />
        </div>
      </div>
    );
  },

  _onChange() {
    return this.setState(internals.getStateFromStores())
  }
})

export default SlotMachine;
