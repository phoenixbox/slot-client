// Libs
import React from 'react/addons';
import _ from 'lodash';

// Flux
import ReelsStore from '../../stores/reels-store';

// Components
import CoffeeMachine from './coffee-machine';
import Slot from './slot';
import GameResult from './game-result';

let internals = {
  getStateFromStores() {
    return {
      targetIndexes: ReelsStore.getTargetIndexes()
    }
  }
}

let GameBoard = React.createClass({
  propTypes: {
    spinning: React.PropTypes.bool,
    speed: React.PropTypes.number
  },

  getInitialState() {
    return internals.getStateFromStores()
  },

  buildSlots() {
    let slotCount = _.keys(this.state.targetIndexes).length;
    let colStyles = {
      width: `${100/slotCount}%`,
      float: 'left',
      display: 'inline'
    };

    return _.map(this.state.targetIndexes, (val, key) => {
        return (
          <div style={colStyles}>
            <Slot spinning={this.props.spinning}
               indexTarget={val}
                      speed={this.props.speed}
                       key={key} />
          </div>
        )
    })
  },

  componentDidMount() {
    ReelsStore.addChangeListener(this._onChange)
  },

  componentWillUnmount() {
    ReelsStore.removeChangeListener(this._onChange)
  },

  render() {
    return (
      <div className="game-board col-xs-12">
        <div className="row">
          {this.buildSlots()}
        </div>
        <CoffeeMachine / >
        <GameResult / >
      </div>
    )
  },

  _onChange() {
    return this.setState(internals.getStateFromStores())
  }
})

export default GameBoard
