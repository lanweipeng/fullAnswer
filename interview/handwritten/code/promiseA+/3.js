/**
 * then必须返回一个promise
 * promise2 = promise1.then(onFullfiled, onRejected)
 * 如果onFullfilled或onRejected返回一个值x，运行resolutionProcedure(promise2,x)
 * 如果onFulfilled和onRejected抛出一个异常e，promise2必须拒绝并将e作为reason
 * 如果onFulfilled不是一个方法，并且promise1已经完成（fulfilled）, promise2必须使用与promise1相同的值来完成（fulfiled）
 * 如果onRejected不是一个函数，且promise1为失败状态，promise2必须使用与promise1相同的reason完成
 * promise和x引用同一个对象，则用TypeError作为reason拒绝promise
 */

//promise有且仅有的三种状态，这样写是为了避免硬编码
const PENDING = "pending";
const FULLFILED = "fullfilled";
const REJECTED = "rejected";

class MyPromise {
  #state = PENDING; //状态
  #value; //成功时返回的值
  #reason; //失败返回的原因
  #resolvedCallbacks = [];
  #rejectedCallbacks = [];
  constructor(executor) {
    const resolve = (value) => {
      if (this.#state !== PENDING) return;
      this.#state = FULLFILED;
      this.#value = value;
      setTimeout(() => {
        if (this.#state === FULLFILED) {
          this.#resolvedCallbacks.forEach((fn) => fn());
        }
      });
    };
    const reject = (reason) => {
      if (this.#state !== PENDING) return;
      this.#state = REJECTED;
      this.#reason = reason;
      setTimeout(() => {
        if (this.#state === REJECTED) {
          this.#rejectedCallbacks.forEach((fn) => fn());
        }
      });
    };
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    // onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    // onRejected =
    //   typeof onRejected === "function"
    //     ? onFulfilled
    //     : (r) => {
    //         throw r;
    //       };
    if (typeof onFulfilled !== "function") {
      onFulfilled = (v) => v;
    }
    if (typeof onRejected !== "function") {
      onRejected = (r) => {
        throw r;
      };
    }
    let promise2;
    return (promise2 = new MyPromise((resolve, reject) => {
      if (this.#state === FULLFILED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.#value);
            this.#resolutionProcedure(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.#state === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.#reason);
            this.#resolutionProcedure(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.#state == PENDING) {
        this.#resolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.#value);
              this.#resolutionProcedure(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.#rejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.#reason);
              this.#resolutionProcedure(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    }));
  }
  #resolutionProcedure(promise2, x, resolve, reject) {
    let called = false;
    if (promise2 == x) {
      reject(new TypeError("chaining cycle detected for promise"));
    }
    if (x != null && (typeof x === "object" || typeof x === "function")) {
      try {
        let then = x.then;
        if (typeof then === "function") {
          then.call(
            x,
            (y) => {
              if (called) return;
              called = true;
              this.#resolutionProcedure(promise2, y, resolve, reject);
            },
            (r) => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } else {
          resolve(x);
        }
      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      resolve(x);
    }
  }
}
const p = new MyPromise((resolve, reject) => {
  resolve(1);
});
p.then((res) => {
  console.log(res);
  return 2;
}).then((res) => {
  console.log(res);
});

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 1000);
})
  .then()
  .then((res) => {
    console.log(res);
  })
  .then(4)
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
