export default class CustomRangeInput {
  constructor(inputElem, callback, options = {}) {
    this.inputElem = inputElem;
    this.min = options.min || 0;
    this.max = options.max || 100;
    this.rangeValue = options.value || this.min;
    this.returnInt = options.returnInt || true;
    this.callback = callback || (() => {});

    this.inputElem.classList.add("range-input-element");
    createRangeInputHTML.call(this);
    eventListenersForInput.call(this);
  }

  get value() {
    return this.rangeValue;
  }

  set value(value) {
    this.rangeValue = value;
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
  this.rangeWraper.style.setProperty(
    "--range-track-covered",
    parseFloat(((this.rangeValue - this.min) * 100) / (this.max - this.min)) +
      "%"
  );
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
      this.value = this.min;
    } else if (e.x > this.rangeTrackRect.x + this.rangeTrackRect.width) {
      this.value = this.max;
      this.rangeProgress = 100;
    } else {
      this.rangeProgress = parseFloat(
        ((e.x - this.rangeTrackRect.x) * 100) / this.rangeTrackRect.width
      );

      let currentValue =
        ((this.max - this.min) * this.rangeProgress) / 100 + this.min;
      if (this.returnInt) {
        this.value = parseInt(currentValue);
      } else {
        this.value = parseFloat(currentValue);
      }
    }
    this.rangeWidth.style.setProperty(
      "--range-track-covered",
      this.rangeProgress + "%"
    );
    this.callback(this.value);
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
