"use strict";
const button = document.querySelector('button');
const input1 = document.getElementById('num1');
const input2 = document.getElementById('num2');
function add(num1, num2) {
    return num1 + num2;
}
button === null || button === void 0 ? void 0 : button.addEventListener('click', function () {
    console.log(add(+(input1 === null || input1 === void 0 ? void 0 : input1.value), +(input2 === null || input2 === void 0 ? void 0 : input2.value)));
});
//# sourceMappingURL=buttonActions.js.map