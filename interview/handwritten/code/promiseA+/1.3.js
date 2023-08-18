const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  #state = PENDING;
  #value;
  #reason;
  #fulfilledCallback;
  #rejectedCallback;
  constructor(executor) {
    const resolve = (value) => {
      if (this.#state === PENDING) {
        this.#state = FULFILLED;
        this.#value = value;
      }
      if (this.#state === FULFILLED) {
        this.#fulfilledCallback(value);
      }
    };
    const reject = (reason) => {
      if (this.#state === PENDING) {
        this.#state = REJECTED;
        this.#reason = reason;
      }
      if (this.#state === REJECTED) {
        this.#rejectedCallback(reason);
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.#state === FULFILLED) {
      onFulfilled(this.#value);
    }
    if (this.#state === REJECTED) {
      onRejected(this.#reason);
    }
    if (this.#state === PENDING) {
      this.#fulfilledCallback = onFulfilled;
      this.#rejectedCallback = onRejected;
    }
  }
}
const promise1 = new MyPromise((resolve) => {
  resolve(1);
});
promise1.then((res) => {
  console.log(res);
});
const promise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(2);
  }, 200);
});
promise2.then(null, (reject) => {
  console.log(reject);
});
