// Libs
import React from 'react/addons';
import _ from 'lodash';

// Flux
import ReelsStore from '../../stores/reels-store';
import ReelsActions from '../../actions/reels-actions';

// Components
import Slot from './slot';
import GameResult from './game-result';
import CoffeeMachine from './coffee-machine';

// Utils
import helpers from './helpers';

let internals = {
  getStateFromStores() {
    return {
      targetIndexes: ReelsStore.getTargetIndexes(),
      winner: ReelsStore.isWinner()
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
    let colStyles = helpers.colStyles(_.keys(this.state.targetIndexes).length)

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
    /* Uncomment init to test win state */
    // ReelsActions.init();
  },

  componentWillUnmount() {
    ReelsStore.removeChangeListener(this._onChange)
  },

  render() {
    return (
      <div className="game-board col-xs-12">
        <CoffeeMachine winner={this.state.winner}
                targetIndexes={this.state.targetIndexes} />
        <div className="row">
          {this.buildSlots()}
        </div>
        <GameResult spinning={this.props.spinning}
                    targetIndexes={this.state.targetIndexes}
                    winner={this.state.winner} />
      </div>
    )
  },

  _onChange() {
    return this.setState(internals.getStateFromStores())
  }
})

export default GameBoard
