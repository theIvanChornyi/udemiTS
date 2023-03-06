class Key {
  private signature: number;
  constructor() {
    this.signature = Math.ceil(Math.random() * (1000 - 1) + 1);
  }
  public getSignature = (): number => this.signature;
}
class Person {
  private key: Key;
  constructor(key: Key) {
    this.key = key;
  }

  public getKey = (): Key => this.key;
}

abstract class House {
  protected door: 'open' | 'close' = 'close';
  protected key: Key;
  private tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
  }

  public abstract openDoor(key: Key): void;

  public comeIn = (newPerson: Person): void => {
    if (this.door === 'open') {
      this.tenants.push(newPerson);
    }
  };
}

class MyHouse extends House {
  constructor(newKey: Key) {
    super(newKey);
  }
  public openDoor(key: Key): void {
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
