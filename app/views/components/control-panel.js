import React from 'react/addons'
import classnames from 'classnames';
import _ from 'lodash';

// Flux
import ReelsActions from '../../actions/reels-actions'

// Components
import Slot from './slot';

// Utils
import helpers from './helpers';

let ControlPanel = React.createClass({
  propTypes: {
    spinning: React.PropTypes.bool,
    speed: React.PropTypes.number,
    winner: React.PropTypes.bool,
    targetIndexes: React.PropTypes.object
  },

  spinReels() {
    ReelsActions.spin()
  },

  buildSlots() {
    let colStyles = helpers.colStyles(_.keys(this.props.targetIndexes).length)

    return _.map(this.props.targetIndexes, (val, key) => {
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

  render() {
    let playClasses = classnames({
      "btn": true,
      "spinning": this.props.spinning
    })

    let buttonCopy = this.props.spinning ? 'Spinning' : 'Spin';

    return (
      <div className="control-panel col-xs-12">
        <div className="slots">
          {this.buildSlots()}
        </div>
        <div className="trigger">
          <button className={playClasses}
                   disabled={this.props.spinning}
                    onClick={this.spinReels}>{buttonCopy}</button>
        </div>
      </div>
    )
  }
})

export default ControlPanel;
