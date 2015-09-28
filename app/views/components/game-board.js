// Libs
import React from 'react/addons';
import _ from 'lodash';

// Flux
import ReelsStore from '../../stores/reels-store';
import ReelsActions from '../../actions/reels-actions';

// Components
import GameResult from './game-result';
import CoffeeMachine from './coffee-machine';

// Utils
import helpers from './helpers';

let GameBoard = React.createClass({
  propTypes: {
    spinning: React.PropTypes.bool,
    speed: React.PropTypes.number,
    winner: React.PropTypes.bool,
    targetIndexes: React.PropTypes.object
  },

  render() {
    return (
      <div className="game-board col-xs-12">
        <CoffeeMachine winner={this.props.winner}
                targetIndexes={this.props.targetIndexes} />
        <GameResult spinning={this.props.spinning}
                    targetIndexes={this.props.targetIndexes}
                    winner={this.props.winner} />
      </div>
    )
  }
})

export default GameBoard
