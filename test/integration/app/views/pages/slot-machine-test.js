require('../../../../testdom')();
var assert = require('chai').assert;
var sinon = require('sinon');
var helpers = require('../../../../../app/views/components/helpers.js');
var SlotMachine = require('../../../../../app/views/pages/slot-machine.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

import stubRouterContext from '../../../stub-router-context';
function renderComponent(props, ctx) {
  let Component = stubRouterContext(SlotMachine, props);
  return TestUtils.renderIntoDocument(<Component {...props} />);
}

describe('SlotMachine', function() {
  beforeEach(function() {
    this.sinon = sinon.sandbox.create();
    this.props = {}

    this.component = renderComponent(this.props, this);
  });

  afterEach(function() {
    this.sinon.restore();
  });

  it('renders the a subitems component', function() {
    debugger
    var slotMachine = TestUtils.findRenderedComponentWithType(this.component, SlotMachine);
    assert.isDefined(slotMachine)
  })
})
