var Confidence = require('confidence');

var CoffeeslotsConfig = {
  SLIDES: 12,
  RADIUS: 185,
  SLIDE_TYPES: ['C', 'E', 'T']
}

var store = new Confidence.Store(CoffeeslotsConfig);

module.exports = store;
