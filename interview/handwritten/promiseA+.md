promise 完整实现很复杂，因此我会拆分成一步步去实现，请大家跟着我的一步步小题目去完成，就能最终学会手写 promise

1. 实现构造函数

题目

```js
const p = new MyPromise((resolve, reject) => {
  resolve(1);
  reject("err"); //不会执行
});
```

实现
promise1.js

```js
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
      //捕获不了异步
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
```

解释

> - #是内部方法
> - const PENDING = "pending";避免硬编码
> - 捕获不了构造函数里面的异步错误，官方也不行
>
> 2. 实现 then 方法

题目

```js
const p = new MyPromise((resolve, reject) => {
  resolve(1);
});
p.then((res) => {
  console.log(res);
});
```

实现

```js
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
```

但是如果里面异步调用 resolve 或者 reject，就会出问题

3. 解决异步调用
   题目

```js
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
p.then((res) => {
  console.log(res);
});
```

思路：想要让 setTimeout 里面的 resolve 能够执行，resolve 调用的时候，changeState 方法一定会执行，那么可以把 then 方法里面的逻辑搬到 changeSate 里面去，但是由于 changeState 里面接受不到 onFullfilled、onRejected，因此可以存储起来
实现
promise3.js

```js
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
```

但是还有问题，then 方法会多次调用

4. 解决多次调用 then

题目

```js
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
```

思路：handle 作为数组，再一项一项拿出来执行
实现
promise4.js

```js
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
```

当 then 方法里面穿的如果不是函数，而是值，那么就会发生值的穿透

5. then 方法传的是值
   题目

```js
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
p.then(2);
p.then((res) => {
  console.log(res); //2
});
```

## 参考

promise5.js

```js
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
```

6. 如果传的是方法，且链式调用

```js
题目;
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
p.then((res) => {
  console.log(res);
  return 2;
}).then((res) => {
  console.log(res);
});
```

promise6.js

```js
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
        const res = onFn(this.#result);
        re(res);
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
```

如果传的是 promise，且链式调用

```js
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
p.then((res) => {
  console.log(res);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
}).then((res) => {
  console.log(res);
});
```

promise7.js

```js
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
        const res = onFn(this.#result);
        if (this.#isPromise(res)) {
          res.then(resolve, reject);
        } else {
          re(res);
        }
      } catch (error) {
        reject(error);
      }
    } else {
      re(onFn || this.#result);
    }
  }
  #isPromise(fn) {
    if (fn != null && (typeof fn === "object" || typeof fn === "function")) {
      return typeof fn.then === "function";
    }
    return false;
  }
  then(onFullfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handles.push({ onFullfilled, onRejected, resolve, reject });
      this.#run();
    });
  }
}
```

最后，函数的执行要放到微队列里面

```js
setTimeout(() => {
  console.log(3);
}, 0);
new MyPromise((resolve) => {
  resolve(2);
}).then((data) => {
  console.log(data);
});
console.log(1);
```

```js
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
      const onFn = this.#state === FULLFIllED ? onFullfilled : onRejected;
      const re = this.#state === FULLFIllED ? resolve : reject;
      if (typeof onFullfilled === "function") {
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
      } else {
        re(onFn || this.#result);
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
    return new MyPromise((resolve, reject) => {
      this.#handles.push({ onFullfilled, onRejected, resolve, reject });
      this.#run();
    });
  }
}
```

[b 站视频讲解](https://www.bilibili.com/video/BV1yJ411771n?p=8&spm_id_from=pageDriver&vd_source=1717bca8aebff18ca2591bd114c54e3f)能通过测试用例
[渡一教育视频：手写 promise](https://www.douyin.com/video/7230707484846067005) //通过不了所有 promiseA+规范的测试用例，只能作为初学者学习，讲解很牛逼
[原版 promiseA+规范](https://promisesaplus.com/)
[原版 promiseA+中文翻译](https://juejin.cn/post/6844904070205931533)
[yck](https://github1s.com/InterviewMap/CS-Interview-Knowledge-Map)能过测试用例，不容易看懂，且没步骤
[杨信鹏的博客](https://www.hxin.link/javascript/promise.html#then-%E6%96%B9%E6%B3%95)能过测试用例，不容易看懂，但有步骤
