import 'reflect-metadata';

interface ICuboid {
  width: number;
  length: number;
  height: number;
  calcArea: (multiply?: number) => number;
  calcVolume: (multiply?: number) => number;
}

interface ShipingContData {
  createdAt: Date;
  lastCalculation: string;
}

@dateStamp
class ShippingContainer implements ICuboid {
  @IsInt()
  @Min(1)
  width: number;

  @IsInt()
  @Min(1)
  length: number;

  @IsInt()
  @Min(1)
  @Max(8)
  height: number;

  constructor(width: number, length: number, height: number) {
    this.width = width;
    this.length = length;
    this.height = height;

    validate(this, 'width', width);
    validate(this, 'length', length);
    validate(this, 'height', height);
  }
  @lastOperationStamp
  calcArea(multiply?: number): number {
    return this.width * this.length * (multiply ? multiply : 1);
  }
  @lastOperationStamp
  calcVolume(multiply?: number) {
    return this.width * this.length * this.height * (multiply ? multiply : 1);
  }
}

function dateStamp<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    createdAt = new Date().toLocaleString();
  };
}

function lastOperationStamp(
  _: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  const oldValue = descriptor.value;
  descriptor.value = function (this: any, ...args: any[]) {
    this.lastCalculation = `Последний подсчет ${propertyKey.toString()} был ${new Date().toLocaleString()}`;
    return oldValue.apply(this, args);
  };
}

function IsInt() {
  return function (target: any, propertyKey: string | symbol) {
    Reflect.defineMetadata('IsInt', true, target, propertyKey);
  };
}

function Min(limit: number) {
  return function (target: any, propertyKey: string | symbol) {
    Reflect.defineMetadata('Min', limit, target, propertyKey);
  };
}

function Max(limit: number) {
  return function (target: any, propertyKey: string | symbol) {
    Reflect.defineMetadata('Max', limit, target, propertyKey);
  };
}

function validate(target: any, propertyKey: string, value: any) {
  if (
    Reflect.hasMetadata('IsInt', target, propertyKey) &&
    (!Number.isInteger(value) || value !== Number.parseInt(value))
  ) {
    throw new Error(
      `Property ${propertyKey} in not integer number! (${value})`
    );
  }
  if (
    Reflect.hasMetadata('Min', target, propertyKey) &&
    value < Reflect.getMetadata('Min', target, propertyKey)
  ) {
    throw new Error(`Property ${propertyKey} lower than limit (${value})`);
  }
  if (
    Reflect.hasMetadata('Max', target, propertyKey) &&
    Reflect.getMetadata('Max', target, propertyKey) < value
  ) {
    throw new Error(`Property ${propertyKey} bigger than limit (${value})`);
  }
}

function finalValidate(obj: unknown) {
  if (obj && obj.toString() === '[object Object]') {
    for (const key in obj) {
      validate(obj, key, obj[key as keyof typeof obj]);
    }
  }
}
/////////////////////////////////////////

const container = new ShippingContainer(2, 100, 7) as ICuboid & ShipingContData;
container.width = 2;
container.height = 5;
console.log(container.calcVolume());
console.log(container.createdAt);

// 1. Необходимо создать декоратор класса, который будет записывать дату создания контейнера
// Простыми словами - создавать в нем новое свойство createdAt с датой создания экземпляра

setTimeout(() => {
  const container2 = new ShippingContainer(10, 100, 7) as ICuboid &
    ShipingContData;

  setTimeout(() => {
    console.log(container2.createdAt);
  }, 1000);
}, 3000);

// 2. Необходимо создать декораторы IsInt, Min и Max, которые будут валидировать свойства класса
// Применение смотрите в самом классе. При ошибке выполняйте throw new Error
// IsInt проверяет на то, что было передано целое число

// 3. Необходимо создать декоратор метода, который при каждом запуске метода будет создавать
// ИЛИ менять содержимое свойства самого класса lastCalculation
// Как значение записывать в него строку "Последний подсчет ${method} был ${Дата}",
// Где method - это название подсчета, который передается при вызове декоратора (площадь или объем)

console.log(container.calcArea(2));
finalValidate(container);
