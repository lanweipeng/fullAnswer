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
    console.log(this.#state, this.#result);
  }
}
//test
const p1 = new MyPromise((resolve, reject) => {
  resolve(1);
  reject("err");
});
const p2 = new MyPromise((resolve, reject) => {
  reject("err");
  resolve(1);
});
const p3 = new MyPromise((resolve, reject) => {
  throw "sync error";
});
//捕获不了异步任务，官方也没办法
const p4 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    throw "async error";
  }, 0);
});
