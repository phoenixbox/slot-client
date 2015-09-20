module.exports = {
  calculateRotation(ix, slideCount) {
    var degreePerSlide = 360/slideCount;

    return degreePerSlide * ix;
  },
  calculateTranslation(ix) {

  }
}
