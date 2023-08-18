const PENDING = "pending";
const FULLFIllED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handle = {};
  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULLFIllED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  #run() {
    if (this.#state === PENDING) return;
    if (this.#state === FULLFIllED) {
      this.#handle.onFullfilled(this.#result);
    } else if (this.#state === REJECTED) {
      this.#handle.onRejected(this.#result);
    }
  }
  #changeState(state, result) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
    this.#run();
  }
  then(onFullfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handle = { onFullfilled, onRejected };
      this.#run();
    });
  }
}
//test
const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
p1.then((res) => {
  console.log(res);
});
const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("err");
  }, 1000);
});
p2.then(null, (err) => {
  console.log(err);
});
const p3 = new MyPromise((resolve, reject) => {
  resolve(3);
});
p3.then((res) => {
  console.log(res);
});
