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
  describe('#vowelSound', function() {
    it('returns true for vowelSound', function() {
      var testWord = 'accountant'
      assert.isTrue(helpers.vowelSound(testWord))
    })
    it('returns false for non vowelSound', function() {
      var testWord = 'doctor'
      assert.isFalse(helpers.vowelSound(testWord))
    })
  })
  describe('#slideType', function() {
    describe('type T', function() {
      it('calculates slide type T for index', function() {
        let result = helpers.slideType(5);
        let target = 'T';

        assert.equal(result, target)
      })
      it('calculates slide type T for index', function() {
        let result = helpers.slideType(2);
        let target = 'T';

        assert.equal(result, target)
      })
    })
    describe('type C', function() {
      it('calculates slide type C for index', function() {
        let result = helpers.slideType(3);
        let target = 'C';

        assert.equal(result, target)
      })
      it('calculates slide type C for index', function() {
        let result = helpers.slideType(0);
        let target = 'C';

        assert.equal(result, target)
      })
    })
    describe('type E', function() {
      it('calculates slide type E for index', function() {
        let result = helpers.slideType(4);
        let target = 'E';

        assert.equal(result, target)
      })
      it('calculates slide type E for index', function() {
        let result = helpers.slideType(1);
        let target = 'E';

        assert.equal(result, target)
      })
    })
  })
})
