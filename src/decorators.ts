import 'reflect-metadata';
const limMetaKey = Symbol('lim');

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

  @limit(4)
  freeSeats: number = 0;

  constructor() {
    this['freeSeats'] = this.freeSeats;
  }

  @checkFuel
  public isOpen(reason: string): string {
    return this.open ? 'Open' : `Closed by ${reason}`;
  }
  @validate
  isTrue(@lim param: number) {
    console.log('param', param);
  }
}

const car = new Car();
///////////////////////////////////////////////////////
// CLASS
function changeDorStatus(status: boolean) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      open = status;
    };
  };
}

function changeAmounOfFuel(amount: number) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      fuel = `${amount}%`;
    };
  };
}

////////////////////////////////////////////
// METHOD
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
//////////////////////////////////////////////////////
// PROPERTY
function limit(limit: number) {
  return function (target: any, propertyKey: string) {
    let number: number = target[propertyKey];
    Object.defineProperty(target, propertyKey, {
      get(this: any) {
        return number || limit;
      },
      set(this: any, newAmoun: number) {
        if (newAmoun >= 1 && newAmoun < limit) {
          number = newAmoun;
        } else {
          number = limit;
        }
      },
      enumerable: true,
      configurable: true,
    });
  };
}
////////////////////////////////////////////////////////////
// PARAMETER

function lim(target: Object, propertyKey: string | symbol, idx: number) {
  let limParameters: number[] =
    Reflect.getOwnMetadata(limMetaKey, target, propertyKey) || [];
  limParameters.push(idx);
  Reflect.defineMetadata(limMetaKey, limParameters, target, propertyKey);
}

function validate(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  descriptor.value = function (...args: any[]) {
    let limParameters: number[] = Reflect.getOwnMetadata(
      limMetaKey,
      target,
      propertyKey
    );

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
