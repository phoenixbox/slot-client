import CoffeeslotsConfig from '../../utils/coffee-slots-config';

module.exports = {
  calculateRotation(ix, slideCount, targetIndex=0) {
    var degreePerSlide = 360/slideCount;
    return (degreePerSlide * ix) - (degreePerSlide * targetIndex);
  },
  slideType(ix) {
    let type;
    let types = CoffeeslotsConfig.get('/SLIDE_TYPES');
    let baseIndex = ix % 3;
    return types[baseIndex];
  }
}
