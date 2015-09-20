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

    if (baseIndex === 0) {
      type = 'C';
    } else if (baseIndex === 1) {
      type = 'E';
    } else if (baseIndex === 2) {
      type = 'T';
    } else {
      console.log('Not within options')
    }

    return type
  }
}
