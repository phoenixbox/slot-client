import React from 'react/addons';
import _ from 'lodash';
import helpers from './helpers';

// Components

let Slot = React.createClass({
  slotTransform(ix) {
    let rotation = helpers.calculateRotation(ix);

    return `-webkit-transform: rotateX(${rotation}deg) translateZ(200px)`;
  },

  slotSlides() {
    return _.map(_.times(12), (ix) => {
      let slotStyle = this.slotTransform();

      <div className="poster" style={{slotStyle}}><p>{ix}</p></div>
    })
  },

  render() {
    return (
      <div className="slot col-xs-12">
        <div id="stage"></div>
        <div id="rotate">
          <div id="ring-1" className="ring">
          {this.slotSlides()}
          </div>
        </div>
      </div>
    )
  }
})

export default Slot;
