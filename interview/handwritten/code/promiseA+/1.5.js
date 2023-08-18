const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  #state = PENDING;
  #value;
  #reason;
  #fulfilledCallbacks = [];
  #rejectedCallbacks = [];
  constructor(executor) {
    const resolve = (value) => {
      if (this.#state === PENDING) {
        this.#state = FULFILLED;
        this.#value = value;
      }
      if (this.#state === FULFILLED) {
        this.#fulfilledCallbacks.forEach((cb) => cb(value));
      }
    };
    const reject = (reason) => {
      if (this.#state === PENDING) {
        this.#state = REJECTED;
        this.#reason = reason;
      }
      if (this.#state === REJECTED) {
        this.#rejectedCallbacks.forEach((cb) => cb(reason));
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.#state === FULFILLED) {
        const x = onFulfilled(this.#value);
        resolve(x);
      }
      if (this.#state === REJECTED) {
        const x = onRejected(this.#reason);
        reject(x);
      }
      if (this.#state === PENDING) {
        this.#fulfilledCallbacks.push(onFulfilled);
        this.#rejectedCallbacks.push(onRejected);
      }
    });
    return promise2;
  }
}
const promise1 = new MyPromise((resolve) => {
  resolve(1);
});
promise1
  .then((res) => {
    console.log(res);
    return 2;
  })
  .then((res) => {
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
promise2.then(null, (reject) => {
  console.log(reject);
});
