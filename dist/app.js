"use strict";
let age = 50;
let myName = 'Max';
let toggle = true;
let empty = null;
let notInitialize = undefined;
let callback = (a) => {
    return 100 + a;
};
let anything = -20;
anything = 'Text';
anything = {};
let some;
some = 'Text';
let str;
if (typeof some === 'string')
    str = some;
let person = ['Max', 'qwe', [], 21];
var Status;
(function (Status) {
    Status["LOADING"] = "loading";
    Status["LOAD"] = "load";
    Status["ABORT"] = "abort";
    Status["ERROR"] = "erorr";
})(Status || (Status = {}));
let variable;
let check;
const showMessage = function (message) {
    console.log(message);
};
const calc = function (num1, num2) {
    return num1 + num2;
};
const customError = function () {
    throw new Error('Error');
};
const page1 = {
    title: 'The awesome page',
    likes: 100,
    accounts: ['Max', 'Anton', 'Nikita'],
    status: 'open',
    details: {
        createAt: '2021-01-01',
        updateAt: '2021-05-01',
    },
};
const page2 = {
    title: 'Python or Js',
    likes: 5,
    accounts: ['Alex'],
    status: 'close',
};
//# sourceMappingURL=app.js.map