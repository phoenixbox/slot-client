import React from 'react/addons';
import _ from 'lodash';
import helpers from './helpers';

// Components
const SLIDES = 12;
const RADIUS = 185;
const OPTIONS = ['C', 'E', 'T'];

let Slot = React.createClass({

  propTypes: {
    spinning: React.PropTypes.bool.isRequired,
    indexTarget: React.PropTypes.number.isRequired,
    speed: React.PropTypes.number.isRequired
  },

  slotTransform(ix) {
    let rotation = helpers.calculateRotation(ix, SLIDES, this.props.indexTarget);

    return {"-webkit-transform": `rotateX(${rotation}deg) translateZ(${RADIUS}px)`};
  },

  slotSlides(targetIndex = 0) {
    return _.map(_.times(SLIDES), (ix) => {
      return <div className="poster" style={this.slotTransform(ix)}><p>{helpers.slideType(ix)}</p></div>
    })
  },

  ringStyles() {
    let ringStyles = {};
    let activateSpin = {};
    let speed = {"-webkit-animation-duration": `${this.props.speed}s`}
    _.assign(ringStyles, speed)

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
