import React from 'react/addons';
import classnames from 'classnames';
import Snap from 'snapsvg'

let CoffeeMachine = React.createClass({

  componentDidMount() {
    this.s = new Snap('.coffee-machine-svg')
    Snap.load('/img/svg/coffee-machine.svg', (response) => {
      var machine = response;
      this.s.append(machine);
    })
  },

  render() {
    return (
      <div className="coffee-machine col-xs-12">
        <svg className="coffee-machine-svg"></svg>
      </div>
    )
  }
})

export default CoffeeMachine;
