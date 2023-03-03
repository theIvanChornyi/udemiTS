interface Queue<T> {
  enqueue(item: T): void; // поставить в очередь
  dequeue(): T | undefined; // исключить из очереди
  peek(): T | undefined | null; // посмотреть первый элемент
  isEmpty(): boolean; // проверка на "пустоту" сущности
  length(): number; // проверка на длину
}

class ArrayQueue<T> implements Queue<T> {
  #queue: T[] = [];

  enqueue(this: ArrayQueue<T>, item: T): void {
    this.#queue.push(item);
  }
  dequeue(this: ArrayQueue<T>): T | undefined {
    return this.#queue.shift();
  }
  peek(this: ArrayQueue<T>): T | null {
    return this.isEmpty() ? null : this.#queue[0];
  }
  isEmpty(this: ArrayQueue<T>): boolean {
    return this.#queue.length > 0 ? true : false;
  }
  length(this: ArrayQueue<T>): number {
    return this.#queue.length;
  }
}

class Stack<T> {
  #stack: T[] = [];
  #limit: number;

  constructor(limit: number = Number.MAX_VALUE) {
    this.#limit = limit;
  }

  push(this: Stack<T>, value: T): void {
    if (this.length() >= this.#limit) {
      throw new Error('Stack overflow!!!');
    }
    this.#stack.push(value);
  }

  pop(this: Stack<T>): T {
    if (this.isEmpty()) {
      throw new Error('Stack is empty!!!');
    } else {
      return this.#stack.pop() as T;
    }
  }

  length(this: Stack<T>): number {
    return this.#stack.length;
  }

  isEmpty(this: Stack<T>): boolean {
    return this.#stack.length > 0 ? false : true;
  }

  top(this: Stack<T>): T | null {
    return this.isEmpty() ? null : this.#stack[this.length() - 1];
  }
}

// Для тестов

const arrTest1 = new ArrayQueue<number>();
arrTest1.enqueue(5);
arrTest1.enqueue(10);
console.log(arrTest1.peek());
console.log(arrTest1.dequeue());
console.log(arrTest1.length());

const arrTest2 = new ArrayQueue<string>();
arrTest2.enqueue('5');
arrTest2.enqueue('10');
console.log(arrTest2.peek());
console.log(arrTest2.dequeue());
console.log(arrTest2.length());

const stackTest1 = new Stack<number>(10);
stackTest1.push(20);
stackTest1.push(50);
console.log(stackTest1.top());
console.log(stackTest1.pop());
console.log(stackTest1.length());

const stackTest2 = new Stack<string>(10);
stackTest2.push('20');
stackTest2.push('50');
console.log(stackTest2.top());
console.log(stackTest2.pop());
console.log(stackTest2.length());
