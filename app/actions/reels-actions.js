var AppDispatcher = require('../dispatchers/dispatcher.js');
var ReelsConstants = require('../constants/reels-constants.js')

module.exports = {
  spin: function() {
    AppDispatcher.dispatch({
      actionType: ReelsConstants.SPIN
    });
  }
};
