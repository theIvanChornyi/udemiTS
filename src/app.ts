////////////////////////////////////////////////////////////////////////////
let age: number = 50;
let myName: string = 'Max';
let toggle: boolean = true;
let empty: null = null;
let notInitialize: undefined = undefined;
let callback: (arg: number) => number = (a: number) => {
  return 100 + a;
};

let anything: any = -20;
anything = 'Text';
anything = {};

let some: unknown;
some = 'Text';
let str: string;
if (typeof some === 'string') str = some;

let person: [...string[], [], number] = ['Max', 'qwe', [], 21];

enum Status {
  LOADING = 'loading',
  LOAD = 'load',
  ABORT = 'abort',
  ERROR = 'erorr',
}

let variable: string | number;
let check: 'enable' | 'disable';

type TShow = (arg: string) => void;
type TCalc = (arg1: number, arg2: number) => number;
type TErrorFunc = () => never;

const showMessage: TShow = function (message: string): void {
  console.log(message);
};

const calc: TCalc = function (num1: number, num2: number): number {
  return num1 + num2;
};

const customError: TErrorFunc = function (): never {
  throw new Error('Error');
};

type TPage = {
  title: string;
  likes: number;
  accounts: string[];
  status: 'open' | 'close';
  details?: {
    createAt: string | Date;
    updateAt: string | Date;
  };
};

const page1: TPage = {
  title: 'The awesome page',
  likes: 100,
  accounts: ['Max', 'Anton', 'Nikita'],
  status: 'open',
  details: {
    createAt: '2021-01-01',
    updateAt: '2021-05-01',
  },
};

const page2: TPage = {
  title: 'Python or Js',
  likes: 5,
  accounts: ['Alex'],
  status: 'close',
};
////////////////////////////////
