import {assert} from 'chai';
import helpers from '../../../../../app/views/components/helpers.js';

describe('helpers', function() {
  describe('#calculateRotation', function() {
    it('calculates rotation per slide', function() {
      let result = helpers.calculateRotation(3, 12);
      let target = 90;

      assert.equal(result, target)
    })
  })
})
