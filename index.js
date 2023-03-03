"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ArrayQueue_queue, _Stack_stack, _Stack_limit;
class ArrayQueue {
    constructor() {
        _ArrayQueue_queue.set(this, []);
    }
    enqueue(item) {
        __classPrivateFieldGet(this, _ArrayQueue_queue, "f").push(item);
    }
    dequeue() {
        return __classPrivateFieldGet(this, _ArrayQueue_queue, "f").shift();
    }
    peek() {
        return this.isEmpty() ? null : __classPrivateFieldGet(this, _ArrayQueue_queue, "f")[0];
    }
    isEmpty() {
        return __classPrivateFieldGet(this, _ArrayQueue_queue, "f").length > 0 ? true : false;
    }
    length() {
        return __classPrivateFieldGet(this, _ArrayQueue_queue, "f").length;
    }
}
_ArrayQueue_queue = new WeakMap();
class Stack {
    constructor(limit = Number.MAX_VALUE) {
        _Stack_stack.set(this, []);
        _Stack_limit.set(this, void 0);
        __classPrivateFieldSet(this, _Stack_limit, limit, "f");
    }
    push(value) {
        if (this.length() >= __classPrivateFieldGet(this, _Stack_limit, "f")) {
            throw new Error('Stack overflow!!!');
        }
        __classPrivateFieldGet(this, _Stack_stack, "f").push(value);
    }
    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty!!!');
        }
        else {
            return __classPrivateFieldGet(this, _Stack_stack, "f").pop();
        }
    }
    length() {
        return __classPrivateFieldGet(this, _Stack_stack, "f").length;
    }
    isEmpty() {
        return __classPrivateFieldGet(this, _Stack_stack, "f").length > 0 ? false : true;
    }
    top() {
        return this.isEmpty() ? null : __classPrivateFieldGet(this, _Stack_stack, "f")[this.length() - 1];
    }
}
_Stack_stack = new WeakMap(), _Stack_limit = new WeakMap();
// Для тестов
const arrTest1 = new ArrayQueue();
arrTest1.enqueue(5);
arrTest1.enqueue(10);
console.log(arrTest1.peek());
console.log(arrTest1.dequeue());
console.log(arrTest1.length());
const arrTest2 = new ArrayQueue();
arrTest2.enqueue('5');
arrTest2.enqueue('10');
console.log(arrTest2.peek());
console.log(arrTest2.dequeue());
console.log(arrTest2.length());
const stackTest1 = new Stack(10);
stackTest1.push(20);
stackTest1.push(50);
console.log(stackTest1.top());
console.log(stackTest1.pop());
console.log(stackTest1.length());
const stackTest2 = new Stack(10);
stackTest2.push('20');
stackTest2.push('50');
console.log(stackTest2.top());
console.log(stackTest2.pop());
console.log(stackTest2.length());
