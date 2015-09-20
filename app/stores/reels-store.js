import AppDispatcher from '../dispatchers/dispatcher';
import {EventEmitter} from 'events';
import ReelsConstants from '../constants/reels-constants';
import CoffeeslotsConfig from '../utils/coffee-slots-config';
import _ from 'lodash';
import moment from 'moment';

let _isSpinning = false;
// Default Setup Indexes
let _targetIndexes = {
  0: 0,
  1: 0,
  2: 0
}
let _spinSpeed = 1;

let ReelsStore = _.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },

  isSpinning() {
    return _isSpinning;
  },

  setSpinning(state) {
    _isSpinning = state;

    this.emitChange();
  },

  randomizeTargetIndexes() {
    let typeCount = CoffeeslotsConfig.get('/SLIDE_TYPES').length;

    _targetIndexes = internals.randomize(_targetIndexes, typeCount);
  },

  getTargetIndexes() {
    return _targetIndexes;
  },

  getSpinSpeed() {
    return _spinSpeed;
  },

  setSpinSpeed(speed) {
    _spinSpeed = speed;

    this.emitChange();
  }
});

let internals = ReelsStore.internals = {
  spin() {
    ReelsStore.randomizeTargetIndexes();
    ReelsStore.setSpinning(true);

    let delayTime = _spinSpeed * 1000 * 1.1;

    _.delay( (spinState) => {
      ReelsStore.setSpinning(spinState);
    },  delayTime, false);
  },
  randomize(indexes, n) {
    let indexClone = _.cloneDeep(indexes);

    _.each(indexClone, (val, key) => {
      let typeIndexArray = _.map(_.times(n), (i) => { return i })

      indexClone[key] = _.sample(typeIndexArray)
    })

    return indexClone;
  }
}

ReelsStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case ReelsConstants.SPIN:
      internals.spin();
      break;
    default:
      break;
  }
});

export default ReelsStore;
module.exports.internals = internals
