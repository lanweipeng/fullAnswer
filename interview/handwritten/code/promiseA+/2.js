/**
 * 1.延迟调用回调
 * 2.
 * then方法可以被同一个 promise 调用多次。
 * 如果或者当 promise 处于 fulfilled 状态， 所有自己的 onFulfilled 回调函数，
 * 必须要按照 then 注册的顺序被调用。
 * 如果或者当 promise 处于 rejected 状态， 所有自己的 onRejected 回调函数，
 * 必须要按照 then 注册的顺序被调用。
 */

//promise有且仅有的三种状态，这样写是为了避免硬编码
const PENDING = 'pending'
const FULLFILED = 'fullfilled'
const REJECTED = 'rejected'

class MyPromise {
  #state = PENDING;//状态
  #value;//成功时返回的值
  #reason;//失败返回的原因
  #resolvedCallbacks = []
  #rejectedCallbacks = []
  constructor(executor) {

    const resolve = (value) => {
      if (this.#state !== PENDING) return;
      this.#state = FULLFILED;
      this.#value = value;
      setTimeout(() => {
        if (this.#state === FULLFILED) {
          this.#resolvedCallbacks.forEach(fn => fn())
        }
      });
    }
    const reject = (reason) => {
      if (this.#state !== PENDING) return;
      this.#state = REJECTED;
      this.#reason = reason;
      setTimeout(() => {
        if (this.#state === REJECTED) {
          this.#rejectedCallbacks.forEach(fn => fn())
        }
      });
    }
    executor(resolve, reject)
  }
  then(onFulfilled = v => v, onRejected = r => { throw r }) {
    this.#resolvedCallbacks.push((v) => onFulfilled(this.#value || v))
    this.#rejectedCallbacks.push((r) => onRejected(this.#reason || r))
  }
}
MyPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
const p = new MyPromise((resolve, reject) => {
  resolve(1)
})
p.then(res => {
  console.log(res)
})
p.then(res => {
  console.log(res)
})

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 1000);
})
p1.then(res => {
  console.log(res)
})
module.exports=MyPromise