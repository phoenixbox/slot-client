import React from 'react/addons'
import CoffeeslotsConfig from '../../utils/coffee-slots-config'

// Components

let Result = React.createClass({
  propTypes: {
    typeIndex: React.PropTypes.number
  },

  render() {
    let type = CoffeeslotsConfig.get('/SLIDE_TYPES')[this.props.typeIndex]

    return (
      <div className="result col-xs-12">
        {type}
      </div>
    )
  }
})

export default Result;
