import React from 'react/addons';
import _ from 'lodash';
import helpers from './helpers';

// Components
const SLIDES = 12;
const RADIUS = 185;
const OPTIONS = ['C', 'E', 'T'];

let Slot = React.createClass({

  propTypes: {
    spinning: React.PropTypes.bool,
    targetIndex: React.PropTypes.number
  },

  slotTransform(ix) {
    let rotation = helpers.calculateRotation(ix, SLIDES);

    return {"-webkit-transform": `rotateX(${rotation+30}deg) translateZ(${RADIUS}px)`};
  },

  slotSlides(targetIndex = 0) {
    return _.map(_.times(SLIDES), (ix) => {

      return <div className="poster" style={this.slotTransform(ix)}><p>{helpers.slideType(ix)}</p></div>
    })
  },

  ringStyles() {
    let ringStyles = {};
    let activateSpin = {};
    let spinDuration = {"-webkit-animation-duration": "1s"}
    _.assign(ringStyles, spinDuration)

    if (this.props.spinning) {
      _.assign(ringStyles, { "-webkit-animation-name": "x-spin" })
    }

    return ringStyles;
  },

  render() {
    return (
      <div className="slot col-xs-12">
        <div id="stage">
          <div id="rotate">
            <div id="ring-1" className="ring" style={this.ringStyles()}>
              {this.slotSlides()}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Slot;
