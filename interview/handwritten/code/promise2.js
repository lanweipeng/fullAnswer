const PENDING = "pending";
const FULLFIllED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  #state = PENDING;
  #result = undefined;
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
  #changeState(state, result) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
  }
  then(onFullfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.#state === FULLFIllED) {
        onFullfilled(this.#result);
      } else if (this.#state === REJECTED) {
        onRejected(this.#result);
      }
    });
  }
}
//test
const p1 = new MyPromise((resolve, reject) => {
  resolve(1);
  reject("err");
});
p1.then((res) => {
  console.log(res);
});
const p2 = new MyPromise((resolve, reject) => {
  reject("err");
  resolve(1);
});
p2.then(null, (err) => {
  console.log(err);
});
const p3 = new MyPromise((resolve, reject) => {
  throw "sync error";
});
p3.then(null, (err) => {
  console.log(err);
});
