"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
let ShippingContainer = class ShippingContainer {
    constructor(width, length, height) {
        this.width = width;
        this.length = length;
        this.height = height;
        validate(this, 'width', width);
        validate(this, 'length', length);
        validate(this, 'height', height);
    }
    calcArea(multiply) {
        return this.width * this.length * (multiply ? multiply : 1);
    }
    calcVolume(multiply) {
        return this.width * this.length * this.height * (multiply ? multiply : 1);
    }
};
__decorate([
    IsInt(),
    Min(1),
    IsInt(),
    __metadata("design:type", Number)
], ShippingContainer.prototype, "width", void 0);
__decorate([
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], ShippingContainer.prototype, "length", void 0);
__decorate([
    IsInt(),
    Min(1),
    Max(8),
    __metadata("design:type", Number)
], ShippingContainer.prototype, "height", void 0);
__decorate([
    lastOperationStamp,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Number)
], ShippingContainer.prototype, "calcArea", null);
__decorate([
    lastOperationStamp,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ShippingContainer.prototype, "calcVolume", null);
ShippingContainer = __decorate([
    dateStamp,
    __metadata("design:paramtypes", [Number, Number, Number])
], ShippingContainer);
function dateStamp(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.createdAt = new Date().toLocaleString();
        }
    };
}
function lastOperationStamp(_, propertyKey, descriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function (...args) {
        this.lastCalculation = `Последний подсчет ${propertyKey.toString()} был ${new Date().toLocaleString()}`;
        return oldValue.apply(this, args);
    };
}
function IsInt() {
    return function (target, propertyKey) {
        Reflect.defineMetadata('IsInt', true, target, propertyKey);
    };
}
function Min(limit) {
    return function (target, propertyKey) {
        Reflect.defineMetadata('Min', limit, target, propertyKey);
    };
}
function Max(limit) {
    return function (target, propertyKey) {
        Reflect.defineMetadata('Max', limit, target, propertyKey);
    };
}
function validate(target, propertyKey, value) {
    if (Reflect.hasMetadata('IsInt', target, propertyKey) &&
        (!Number.isInteger(value) || value !== Number.parseInt(value))) {
        throw new Error(`Property ${propertyKey} in not integer number! (${value})`);
    }
    if (Reflect.hasMetadata('Min', target, propertyKey) &&
        value < Reflect.getMetadata('Min', target, propertyKey)) {
        throw new Error(`Property ${propertyKey} lower than limit (${value})`);
    }
    if (Reflect.hasMetadata('Max', target, propertyKey) &&
        Reflect.getMetadata('Max', target, propertyKey) < value) {
        throw new Error(`Property ${propertyKey} bigger than limit (${value})`);
    }
    return true;
}
const container = new ShippingContainer(10, 100, 10);
container.width = 0;
container.height = 5;
console.log(container.calcVolume());
setTimeout(() => {
    const container2 = new ShippingContainer(10, 100, 10);
    setTimeout(() => {
        console.log(container2);
    }, 1000);
}, 3000);
console.log(container.calcArea(2));
console.log('container', container);
//# sourceMappingURL=customDecorat.js.map