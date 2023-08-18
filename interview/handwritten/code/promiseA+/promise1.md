# 根据 promise/A+规范，手把手带你手写 Promise（一）

这是一篇根据[PromiseA+规范](https://promisesaplus.com/)所写的完整版手写代码，为了更好的让大家更好的学习，我将拆分为两篇，一步一步实现代码，并同时做好详细的说明，请大家跟着我的步骤一步一步实现，并参考我的代码，最终就能写一份完整通过 promiseA+规范 800 多个测试用例的完整版代码，文末有每个步骤的代码地址。

1. 构建一个构造函数

```js
const promise = new MyPromise((resolve) => {
  resolve(1);
});
```

MyPromise 接收一个参数，我们命名为 executor，这个参数是一个函数，而且是立即执行
这里我们用 class 写法来实现，有些博主用 es5 实现，class 写法和 es5 的写法只有写法的区别。

```js
class MyPromise(){
    constructor(executor){
        executor();
    }
}

```

executor 有两个参数，一个是 resolve，一个是 reject，都是回调函数

```js
class MyPromise(){
    constructor(executor){
        const resolve= () => {};
        const reject= () => {};
        executor(resolve, reject);
    }
}
```

promise 有三种状态，pending、fullfiled、rejected
pending 能转为 fullfiled、rejected
当状态为 fullfiled 时，成功并返回 value
当状态为 rejected 时，失败并返回 reason
1.1.js

```js
const PENDING = "pending"; //这样写避免硬编码
const FULLFILED = "fullfiled";
const REJECTED = "rejected";
class MyPromise {
  #state = PENDING; //#表示变量私有
  #value;
  #reason;
  constructor(executor) {
    const resolve = (value) => {
      if (this.#state === PENDING) {
        this.#value = value;
      }
    };
    const reject = (reason) => {
      if (this.#state === PENDING) {
        this.#reason = reason;
      }
    };
    executor(resolve, reject);
  }
}
```

```js
const promise = new MyPromise((resolve) => {
  throw "error";
});
```

构造函数里得需要捕获错误

```js
try {
  executor(resolve, reject);
} catch (error) {
  reject(error);
}
```

但是捕获不了异步错误，官方也做不到

```js
const promise = new MyPromise((resolve) => {
  setTimeout(() => {
    throw "error";
  });
});
```

promise 提供一个 then 方法，通过 then 方法可以访问 value 或者 reason
then 方法接收两个参数`promise.then(onFulfilled, onRejected)`
`onFulfilled, onRejected`都是可选参数

```js
const promise1 = new MyPromise((resolve) => {
  resolve(1);
});
promise1.then((res) => {
  console.log(res);
});
const promise2 = new MyPromise((resolve, reject) => {
  reject(2);
});
promise2.then(null, (reject) => {
  console.log(reject);
});
```

1.2.js

```js
then(onFulfilled, onRejected) {
  if (this.#state === FULFILLED) {
    onFulfilled(this.#value);
  }
  if (this.#state === REJECTED) {
    onRejected(this.#reason);
  }
}
```

但是此时实现不了异步调用

```js
const promise1 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 200);
});
```

因为我们先执行构造函数，再执行 then 方法，可是构造函数执行完，还没执行 reovle 方法，此时状态还是 pending，就执行了 then 方法，那么这时执行不到任何函数。

为了实现异步调用，我们采用发布订阅模式，实现 resolve/reject 和 then 数据共通
如果不知道发布订阅模式，一定要去手写 eventEmitter 体会一下，这也是面试必考，否则下面将很难理解。
1.3.js

```js
class MyPromise {
  //注册中心
  #onFulfilled;
  #onRejected;
  constructor(executor) {
    const resolve = (value) => {
      if (this.#state === PENDING) {
        this.#state = FULFILLED;
        this.#value = value;
      }
      if (this.#state === FULFILLED) {
        this.#onFulfilled(value); //发布
      }
    };
    const reject = (reason) => {
      if (this.#state === PENDING) {
        this.#state = REJECTED;
        this.#reason = reason;
      }
      if (this.#state === FULFILLED) {
        this.#onRejected(reason); //发布
      }
    };
  }
  then(onFulfilled, onRejected) {
    if (this.#state === FULFILLED) {
      onFulfilled(this.#value);
    }
    if (this.#state === REJECTED) {
      onRejected(this.#reason);
    }
    if (this.#state === PENDING) {
      this.#onFulfilled = onFulfilled; //订阅
      this.#onRejected = onRejected; //订阅
    }
  }
}
```

那么就能兼容同步和异步的情况了
但是这时候还不能多次调用

```js
promise.then((res) => {
  console.log(res);
});
promise.then((res) => {
  console.log(res);
});
```

所以注册中心得用队列。
1.4.js

```js
class MyPromise {
  #fulfilledCallbacks = [];
  #rejectedCallbacks = [];
  constructor() {
    const resolve = (value) => {
      this.#fulfilledCallbacks.forEach((cb) => cb(value));
    };
    const resolve = (reason) => {
      this.#fulfilledCallbacks.forEach((cb) => cb(reason));
    };
  }
  then(onFulfilled, onRejected) {
    this.#fulfilledCallbacks.push(onFulfilled);
    this.#fulfilledCallbacks.push(onRejected);
  }
}
```

但是这时候还没有链式调用，想要链式调用，就要返回一个新的 promise 实例

根据规范

```
then必须返回一个promise
promise2 = promise1.then(onFulfilled, onRejected)
如果 onFulfilled 或 onRejected 返回值为 x ，则运行 Promise Resolution Procedure [[Resolve]](promise2, x)(这里暂且将他理解为执行 promise2 的 resolve(x)函数)

```

我们将实现链式调用

```js
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
```

1.5.js

```js

```
