import React from 'react/addons'
import classnames from 'classnames';

import ReelsActions from '../../actions/reels-actions'

let ControlPanel = React.createClass({
  propTypes: {
    spinning: React.PropTypes.bool.isRequired
  },

  spinReels() {
    ReelsActions.spin()
  },

  render() {
    let playClasses = classnames({
      "btn": true,
      "spinning": this.props.spinning
    })

    let buttonCopy = this.props.spinning ? 'Spinning' : 'Spin';

    return (
      <div className="control-panel col-xs-12">
        <button className={playClasses}
                 disabled={this.props.spinning}
                  onClick={this.spinReels}>{buttonCopy}</button>
      </div>
    )
  }
})

export default ControlPanel;
