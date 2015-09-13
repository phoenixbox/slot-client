import React from 'react/addons';
import Router, { Route, DefaultRoute } from 'react-router';
import App from './views/app';
import SlotMachine from './views/pages/slot-machine.js';

var routes = (
  <Route handler={App}>
    <Route name="slots" handler={SlotMachine} />
    <DefaultRoute handler={SlotMachine} />
  </Route>
);

export default function() {
  Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler/>, document.getElementById('coffeeslots'));
  });
}
