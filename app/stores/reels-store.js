import AppDispatcher from '../dispatchers/dispatcher';
import {EventEmitter} from 'events';
import ReelsConstants from '../constants/reels-constants';
import _ from 'lodash';
import moment from 'moment';

let _isSpinning = false;

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
  }
});

let internals = ReelsStore.internals = {
  spin() {
    ReelsStore.setSpinning(true);
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
