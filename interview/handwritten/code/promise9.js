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
    this.#runMicro(() => {
      const onFn =
        this.#state === FULLFIllED
          ? typeof onFullfilled === "function"
            ? onFullfilled
            : (v) => v
          : typeof onRejected === "function"
          ? onRejected
          : (r) => {
              throw r;
            };
      const re = this.#state === FULLFIllED ? resolve : reject;
      try {
        const res = onFn(this.#result);
        if (this.#isPromise(res)) {
          res.then(resolve, reject);
        } else {
          re(res);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  #isPromise(fn) {
    if (fn != null && (typeof fn === "object" || typeof fn === "function")) {
      return typeof fn.then === "function";
    }
    return false;
  }
  #runMicro(func) {
    if (typeof process === "object" && typeof process.nextTick === "function") {
      process.nextTick(func);
    } else if (typeof MutationObserver === "function") {
      const ob = new MutationObserver(func);
      const textNode = document.createTextNode("1");
      ob.observe(textNode, {
        characterData: true,
      });
      textNode.data = "2";
    } else {
      setTimeout(func);
    }
  }
  then(onFullfilled, onRejected) {
    // if (typeof onFulfilled !== "function") return;
    // // 2.2.1.2 不是函数就忽略
    // if (typeof onRejected !== "function") return;
    return new MyPromise((resolve, reject) => {
      this.#handles.push({ onFullfilled, onRejected, resolve, reject });
      this.#run();
    });
  }
}
//test
setTimeout(() => {
  console.log(3);
}, 0);
new MyPromise((resolve) => {
  resolve(2);
}).then((data) => {
  console.log(data);
});
console.log(1);
// module.exports = MyPromise;

new Promise((resolve) => {
  resolve(2);
})
  .then(1)
  .then((res) => {
    console.log(res);
  });

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

module.exports = MyPromise;
