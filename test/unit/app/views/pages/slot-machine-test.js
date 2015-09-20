require('../../../../testdom')('<html><body></body></html>');
import {assert} from 'chai';
import helpers from '../../../../../app/views/components/helpers.js';
import SlotMachine from '../../../../../app/views/pages/slot-machine.js';
var TestUtils = React.addons.TestUtils;

describe('SlotMachine', function() {
  beforeEach(function() {
    this.sinon = sinon.sandbox.create();
    this.props = {}

    this.component = TestUtils.renderIntoDocument(<SlotMachine {...this.props} />)
  });

  afterEach(function() {
    this.sinon.restore();
  });

  it('renders the a subitems component', function(){
    let slotMachine = TestUtils.findRenderedComponentWithType(this.component, SlotMachine);
    assert.isDefined(slotMachine)
  })
})
