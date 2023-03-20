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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const limMetaKey = Symbol('lim');
let Car = class Car {
    constructor() {
        this.fuel = '50%';
        this.open = true;
        this.freeSeats = 0;
        this['freeSeats'] = this.freeSeats;
    }
    isOpen(reason) {
        return this.open ? 'Open' : `Closed by ${reason}`;
    }
    isTrue(param) {
        console.log('param', param);
    }
};
__decorate([
    limit(4),
    __metadata("design:type", Number)
], Car.prototype, "freeSeats", void 0);
__decorate([
    checkFuel,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], Car.prototype, "isOpen", null);
__decorate([
    validate,
    __param(0, lim),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], Car.prototype, "isTrue", null);
Car = __decorate([
    changeAmounOfFuel(30),
    changeDorStatus(false),
    __metadata("design:paramtypes", [])
], Car);
const car = new Car();
function changeDorStatus(status) {
    return function (constructor) {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.open = status;
            }
        };
    };
}
function changeAmounOfFuel(amount) {
    return function (constructor) {
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
function limit(limit) {
    return function (target, propertyKey) {
        let number = target[propertyKey];
        Object.defineProperty(target, propertyKey, {
            get() {
                return number || limit;
            },
            set(newAmoun) {
                if (newAmoun >= 1 && newAmoun < limit) {
                    number = newAmoun;
                }
                else {
                    number = limit;
                }
            },
            enumerable: true,
            configurable: true,
        });
    };
}
function lim(target, propertyKey, idx) {
    let limParameters = Reflect.getOwnMetadata(limMetaKey, target, propertyKey) || [];
    limParameters.push(idx);
    Reflect.defineMetadata(limMetaKey, limParameters, target, propertyKey);
}
function validate(target, propertyKey, descriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args) {
        let limParameters = Reflect.getOwnMetadata(limMetaKey, target, propertyKey);
        if (limParameters) {
            for (const index of limParameters) {
                if (args[index] > 4) {
                    throw new Error('Перегруз');
                }
            }
        }
        return method.apply(this, args);
    };
}
console.log(car.isOpen('key'));
car.freeSeats = 2;
car.isTrue(4);
console.log(car.freeSeats);
//# sourceMappingURL=decorators.js.map