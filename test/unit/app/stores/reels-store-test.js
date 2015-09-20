import {assert} from 'chai';
import ReelsStore from '../../../../app/stores/reels-store.js';

describe('ReelsStore', function() {
  describe('internals', function() {
    describe('randomizeTargets', function() {
      it('returns the reandomized targets', function() {
        let input = {
          0: 0,
          1: 0,
          2: 0
        }

        let result = ReelsStore.internals.randomize(input, 3)

        assert.notDeepEqual(result, input)
      })
    })
  })
})
