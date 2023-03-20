interface ICar {
  fuel: string;
  open: boolean;
  freeSeats: number;
}
@changeAmounOfFuel(30)
@changeDorStatus(false)
class Car implements ICar {
  fuel = '50%';
  open = true;
  freeSeats = 3;

  @checkFuel
  public isOpen(): string {
    return this.open ? 'Open' : 'Closed';
  }
}

const car = new Car();

function changeDorStatus(status: boolean) {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    return class extends constructor {
      open = status;
    };
  };
}

function changeAmounOfFuel(amount: number) {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    return class extends constructor {
      fuel = `${amount}%`;
    };
  };
}

function checkFuel(
  _: Object,
  __: string | symbol,
  descriptor: PropertyDescriptor
) {
  const oldValue = descriptor.value;

  descriptor.value = function (this: any, ...args: any[]) {
    console.log('Fuel', this.fuel);
    return oldValue.apply(this, args);
  };
}

console.log(car.isOpen());
