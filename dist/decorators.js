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
    get isOpen() {
        return this.open ? 'Open' : 'Closed';
    }
};
Car = __decorate([
    closeCar
], Car);
const car = new Car();
function closeCar(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.open = false;
        }
    };
}
console.log(car.isOpen);
//# sourceMappingURL=decorators.js.map