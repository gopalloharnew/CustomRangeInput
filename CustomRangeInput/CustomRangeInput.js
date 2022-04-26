export default class CustomRangeInput {
  constructor(inputElem) {
    this.inputElem = inputElem;
    this.inputElem.classList.add("range-input-element");
    console.log(this.inputElem);
    createRangeInputHTML.call(this);
  }
}

function createRangeInputHTML() {
  this.rangeWraper = createDivOfClass("range-wraper");
  this.rangeTrack = createDivOfClass("range-track");
  this.rangeWidth = createDivOfClass("range-width");
  this.rangeDot = createDivOfClass("range-dot");
  this.rangeTrack.append(this.rangeWidth);
  this.rangeWraper.append(this.rangeTrack);
  this.rangeWidth.append(this.rangeDot);
  this.inputElem.append(this.rangeWraper);
}

function createDivOfClass(className) {
  const newDiv = document.createElement("div");
  newDiv.classList.add(className);
  return newDiv;
}
