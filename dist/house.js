"use strict";
class Key {
    constructor() {
        this.getSignature = () => this.signature;
        this.signature = Math.ceil(Math.random() * (1000 - 1) + 1);
    }
}
class Person {
    constructor(key) {
        this.getKey = () => this.key;
        this.key = key;
    }
}
class House {
    constructor(key) {
        this.door = 'close';
        this.tenants = [];
        this.comeIn = (newPerson) => {
            if (this.door === 'open') {
                this.tenants.push(newPerson);
            }
        };
        this.key = key;
    }
}
class MyHouse extends House {
    constructor(newKey) {
        super(newKey);
    }
    openDoor(key) {
        if (key.getSignature() === this.key.getSignature()) {
            this.door = 'open';
        }
    }
}
const newKey = new Key();
const newPerson = new Person(newKey);
const newHouse = new MyHouse(newKey);
newHouse.openDoor(newKey);
newHouse.comeIn(newPerson);
console.log(newHouse);
//# sourceMappingURL=house.js.map