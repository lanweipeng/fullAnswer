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
      const { onFullfilled, onRejected, resolve, reject } =
        this.#handles.shift();

      if (this.#state === FULLFIllED) {
        this.#executThen({ onFullfilled, resolve, reject });
      } else if (this.#state === REJECTED) {
        this.#executThen({ onRejected, reject });
      }
    }
  }
  #changeState(state, result) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
    this.#run();
  }
  #executThen({ onFullfilled, onRejected, resolve, reject }) {
    const onFn = this.#state === FULLFIllED ? onFullfilled : onRejected;
    const re = this.#state === FULLFIllED ? resolve : reject;
    if (typeof onFullfilled === "function") {
      try {
        onFn(this.#result);
      } catch (error) {
        reject(error);
      }
    } else {
      re(onFn || this.#result);
    }
  }
  then(onFullfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handles.push({ onFullfilled, onRejected, resolve, reject });
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
p.then(2).then((res) => {
  console.log(res, "res");
});
