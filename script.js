import CustomRangeInput from "./CustomRangeInput/CustomRangeInput.js";

const myCustomRangeInput = document.querySelector(".my-custom-range-input");
// let newCustomRangeInput = new CustomRangeInput(myCustomRangeInput);

function test(e) {
  console.log(e);
}

let newCustomRangeInput = new CustomRangeInput(myCustomRangeInput, test);
