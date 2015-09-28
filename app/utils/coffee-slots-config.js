var Confidence = require('confidence');

var CoffeeslotsConfig = {
  SLIDES: 12,
  RADIUS: 185,
  SLIDE_TYPES: ['C', 'E', 'T'],
  SLIDE_TYPE_ANGLES: {
    'C': 288,
    'E': 0,
    'T': 72
  }
}

var store = new Confidence.Store(CoffeeslotsConfig);

module.exports = store;
