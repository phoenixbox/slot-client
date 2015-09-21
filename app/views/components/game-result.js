import React from 'react/addons';
import _ from 'lodash';
import CoffeeslotsConfig from '../../utils/coffee-slots-config';

// Components
import Result from './result'

let GameResult = React.createClass({
  propTypes: {
    winner: React.PropTypes.bool,
    targetIndexes: React.PropTypes.object
  },

  resultList() {
    let resultNodes = _.map(this.props.targetIndexes, (val, key) => {
      return (
        <li>
          <Result key={val} typeIndex={val} />
        </li>
      )
    })

    return <ul>{resultNodes}</ul>
  },

  winnerMessage() {
    if (this.props.winner) {
      let allTypes = CoffeeslotsConfig.get('/SLIDE_TYPES');
      let typeIndex = _.values(this.props.targetIndexes)[0];

      return (
        [
          <div className="winner-message">Congratulations!</div>,
          <div className="winner-prize">{`You won a ${allTypes[typeIndex]}`}</div>
        ]
      )
    }
  },

  render() {
    return (
      <div className="game-result col-xs-12">
        {this.resultList()}
        {this.winnerMessage()}
      </div>
    )
  }
})

export default GameResult;
