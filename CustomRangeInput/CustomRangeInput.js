export default class CustomRangeInput {
  constructor(inputElem) {
    this.inputElem = inputElem;
    this.inputElem.classList.add("range-input-element");
    console.log(this.inputElem);
  }
}
