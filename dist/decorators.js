"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Car = class Car {
    constructor() {
        this.fuel = '50%';
        this.open = true;
        this.freeSeats = 3;
    }
    isOpen() {
        return this.open ? 'Open' : 'Closed';
    }
};
__decorate([
    checkFuel
], Car.prototype, "isOpen", null);
Car = __decorate([
    changeAmounOfFuel(30),
    changeDorStatus(false)
], Car);
const car = new Car();
function changeDorStatus(status) {
    return (constructor) => {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.open = status;
            }
        };
    };
}
function changeAmounOfFuel(amount) {
    return (constructor) => {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.fuel = `${amount}%`;
            }
        };
    };
}
function checkFuel(_, __, descriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function (...args) {
        console.log('Fuel', this.fuel);
        return oldValue.apply(this, args);
    };
}
console.log(car.isOpen());
//# sourceMappingURL=decorators.js.map