export default class CustomRangeInput {
  constructor(inputElem) {
    this.inputElem = inputElem;
    this.inputElem.classList.add("range-input-element");
    console.log(this.inputElem);
    createRangeInputHTML.call(this);
    eventListenersForInput.call(this);
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

function eventListenersForInput() {
  this.rangeTrackRect = this.rangeTrack.getBoundingClientRect();
  // let this = this;
  function rangeAction(e) {
    if (e.x < this.rangeTrackRect.x) {
      this.rangeProgress = 0;
    } else if (e.x > this.rangeTrackRect.x + this.rangeTrackRect.width) {
      this.rangeProgress = 100;
    } else {
      this.rangeProgress = parseFloat(
        ((e.x - this.rangeTrackRect.x) * 100) / this.rangeTrackRect.width
      );
    }
    this.rangeWidth.style.setProperty(
      "--range-track-covered",
      this.rangeProgress + "%"
    );
  }

  const rangeClick = (e) => {
    rangeAction.call(this, e);
  };

  const rangeMouseDown = (e) => {
    this.isMouseDown = true;
    rangeAction.call(this, e);
  };

  const rangeMouseMove = (e) => {
    if (this.isMouseDown) {
      rangeAction.call(this, e);
    }
  };

  const rangeMouseUp = () => {
    this.isMouseDown = false;
  };

  this.rangeWraper.addEventListener("click", rangeClick);
  this.rangeWraper.addEventListener("mousedown", rangeMouseDown);
  document.addEventListener("mousemove", rangeMouseMove);
  document.addEventListener("mouseup", rangeMouseUp);
  window.addEventListener("resize", () => {
    this.rangeTrackRect = this.rangeTrack.getBoundingClientRect();
  });
}
