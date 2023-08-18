// promise 三种状态
// 状态只能由 PENDING -> FULFILLED/REJECTED
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    // 初始状态为 Pending
    this.status = PENDING;
    // this指向问题
    const resolve = (value) => {
      // 判断当前的状态是否为Pending
      // promise状态转变只能从 Pending 开始
      if (this.status === PENDING) {
        // 更新 value 值和 promise 状态
        this.value = value;
        this.status = FULFILLED;
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
      }
    };
    try {
      // 捕获 executor 异常
      executor(resolve, reject);
    } catch (e) {
      // 当发生异常时，调用 reject 函数
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    // 当状态为 Fulfilled 时，调用 onFulfilled函数
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    // 当状态为 Rejected 时，调用 onRejected 函数
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}
const p = new MyPromise((resolve, reject) => {
  resolve("success");
});

p.then((v) => {
  console.log(v);
});
p.then((v) => {
  console.log(`${v}--111`);
});
