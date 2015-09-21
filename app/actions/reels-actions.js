var AppDispatcher = require('../dispatchers/dispatcher.js');
var ReelsConstants = require('../constants/reels-constants.js')

module.exports = {
  init: function() {
    AppDispatcher.dispatch({
      actionType: ReelsConstants.INIT
    });
  },
  spin: function() {
    AppDispatcher.dispatch({
      actionType: ReelsConstants.SPIN
    });
  }
};
