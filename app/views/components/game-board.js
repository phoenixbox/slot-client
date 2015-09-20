import React from 'react/addons'

// Components
import CoffeeMachine from './coffee-machine';
import Slot from './slot';
import GameResult from './game-result';

let GameBoard = React.createClass({
  propTypes: {
    spinning: React.PropTypes.bool
  },

  render() {
    return (
      <div className="game-board col-xs-12">
        <div className="row">
          <div className="col-xs-4">
            <Slot spinning={this.props.spinning} />
          </div>
          <div className="col-xs-4">
            <Slot spinning={this.props.spinning} />
          </div>
          <div className="col-xs-4">
            <Slot spinning={this.props.spinning} />
          </div>
        </div>
        <CoffeeMachine / >
        <GameResult / >
      </div>
    )
  }
})

export default GameBoard
