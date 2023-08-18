const PENDING = "pending";
const FULLFIllED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handles = [];
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
    while (this.#handles.length) {
      const { onFullfilled, onRejected } = this.#handles.shift();
      if (this.#state === FULLFIllED) {
        onFullfilled(this.#result);
      } else if (this.#state === REJECTED) {
        onRejected(this.#result);
      }
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
      this.#handles.push({ onFullfilled, onRejected });
      this.#run();
    });
  }
}
//test

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
p.then((res) => {
  console.log(res);
});
p.then((res) => {
  console.log(res);
});
