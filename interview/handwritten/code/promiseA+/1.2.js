const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  #state = PENDING;
  #value;
  #reason;
  constructor(executor) {
    const resolve = (value) => {
      if (this.#state === PENDING) {
        this.#state = FULFILLED;
        this.#value = value;
      }
    };
    const reject = (reason) => {
      if (this.#state === PENDING) {
        this.#state = REJECTED;
        this.#reason = reason;
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
  }
}
const promise1 = new MyPromise((resolve) => {
  resolve(1);
});
promise1.then((res) => {
  console.log(res);
});
const promise2 = new MyPromise((resolve, reject) => {
  reject(2);
});
promise2.then(null, (reject) => {
  console.log(reject);
});
