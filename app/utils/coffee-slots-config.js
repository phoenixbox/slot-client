var Confidence = require('confidence');

var CoffeeslotsConfig = {
  SLIDES: 12,
  RADIUS: 185,
  SLIDE_TYPES: ['C', 'E', 'T'],
  SLIDE_TYPE_ANGLES: {
    'C': 0,
    'E': 72,
    'T': 144
  }
}

var store = new Confidence.Store(CoffeeslotsConfig);

module.exports = store;
