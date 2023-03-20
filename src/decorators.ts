interface ICar {
  fuel: string;
  open: boolean;
  freeSeats: number;
}

@closeCar
class Car implements ICar {
  fuel = '50%';
  open = true;
  freeSeats = 3;
  get isOpen(): string {
    return this.open ? 'Open' : 'Closed';
  }
}

const car = new Car();

function closeCar<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    open = false;
  };
}

console.log(car.isOpen);
