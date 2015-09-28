import React from 'react/addons';
import _ from 'lodash';
import helpers from './helpers';

// Components
const SLIDES = 12;
const RADIUS = 185;
const OPTIONS = {
  'C': 'coffee',
  'E': 'espresso',
  'T': 'tea'
}

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
      let slideNameMap = ['coffee', 'espresso', 'tea'];
      let slideClasses = `slide ${OPTIONS[helpers.slideType(ix)]}`;

      return (
        <div className={slideClasses} style={this.slotTransform(ix)}></div>
      )
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
