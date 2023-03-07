// interface IDecoration {
//   parent: string;
//   template: string;
// }

// function ControllerDecorator(config: IDecoration) {
//   return function <C extends { new (...args: any[]): { content: string } }>(
//     originalConstructor: C
//   ) {
//     return class extends originalConstructor {
//       private elem: HTMLElement;
//       private parent;
//       constructor(...args: any[]) {
//         super(...args);
//         this.parent = document.getElementById(config.parent)!;
//         this.elem = document.createElement(config.template);
//         this.elem.innerHTML = this.content;
//         this.parent.append(this.elem);
//       }
//     };
//   };
// }

// @ControllerDecorator({ parent: 'app', template: 'div' })
// class Controller {
//   public content = 'Hello world';
// }

// const cont = new Controller();
// const cont2 = new Controller();
// const cont3 = new Controller();
// ///////////////////////////////////////////////////////
// function AutoBind(
//   _: any,
//   _2: string,
//   descriptor: PropertyDescriptor
// ): PropertyDescriptor {
//   const method = descriptor.value as Function;
//   console.log('descriptor', descriptor);
//   console.log('method', method);
//   return {
//     configurable: true,
//     enumerable: false,
//     get() {
//       return method.bind(this);
//     },
//   };
// }

// class Notifier {
//   private message = 'Show message';
//   @AutoBind
//   showMessage() {
//     console.log(this.message);
//   }
// }

// const notifier = new Notifier();

// const copy = notifier.showMessage;
// notifier.showMessage();
// copy();
// ///////////////////////////////////////////////////////
// function AddTax(tax: number) {
//   return function (_: any, _2: string, descriptor: PropertyDescriptor) {
//     const method = descriptor.value as Function;
//     return {
//       configurable: true,
//       enumerable: false,
//       get() {
//         return (...args: any[]) => {
//           const result = method.apply(this, args);
//           return result + (result / 100) * tax;
//         };
//       },
//     };
//   };
// }

// class Payment {
//   @AddTax(20)
//   pay(money: number): number {
//     return money;
//   }
// }

// const pay = new Payment();
// console.log(pay.pay(100));

// ///////////////////////////////////////////////////////
// function CheckEmail(target: any, methodName: string, position: number): void {
//   if (!target[methodName].validation) {
//     target[methodName].validation = {};

//     Object.assign(target[methodName].validation, {
//       [position]: (value: string) => {
//         if (value.includes('@')) {
//           return value;
//         } else {
//           throw new Error('Invalid email');
//         }
//       },
//     });
//   }
// }

// function Validation(
//   _: any,
//   _2: string,
//   descriptor: PropertyDescriptor
// ): PropertyDescriptor {
//   const method = descriptor.value;
//   return {
//     configurable: true,
//     enumerable: false,
//     get() {
//       return (...args: any[]) => {
//         if (method.validation) {
//           args.forEach((item, index) => {
//             if (method.validation[index]) {
//               args[index] = method.validation[index](item);
//             }
//           });
//           return method.apply(this, args);
//         }
//       };
//     },
//   };
// }

// class User {
//   private email: string | null;
//   constructor() {
//     this.email = null;
//   }
//   @Validation
//   setEmail(@CheckEmail email: string) {
//     this.email = email;
//   }
//   getEmail() {
//     console.log(this.email);
//   }
// }
// const newUser = new User();
// newUser.setEmail('qweqwe.qwe');
// newUser.getEmail();

// ///////////////////////////////////////////////////////

interface IValidationConf {
  [prop: string]: {
    [validationProp: string]: string[];
  };
}

const registerValidation: IValidationConf = {};

function Required(target: any, name: string) {
  registerValidation[target.constructor.name] = {
    ...registerValidation[target.constructor.name],
    [name]: ['required'],
  };
}

function PositiveNumber(target: any, name: string) {
  registerValidation[target.constructor.name] = {
    ...registerValidation[target.constructor.name],
    [name]: ['positive'],
  };
}

function validation(obj: any) {
  const objectValidation = registerValidation[obj.constructor.name];
  if (!objectValidation) {
    return true;
  }

  let isValid = true;

  for (const prop in objectValidation) {
    for (const validProp of objectValidation[prop]) {
      switch (validProp) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Citizen {
  @Required
  public name: string;

  @PositiveNumber
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const citizen = new Citizen('Ivan', -28);
if (!validation(citizen)) {
  console.log('propblema');
} else {
  console.log('net proplemi');
}
