这是一篇根据[PromiseA+规范](https://promisesaplus.com/)所写的完整版手写代码，为了更好的让大家更好的学习，我将拆分成几个小的步骤，一步一步实现代码，并同时做好说明，请大家跟着我的步骤一步一步实现，并参考我的代码，最终就能写一份完整通过promiseA+规范800多个测试用例的完整版代码，文末有每个步骤的代码地址。
1. 实现构造器和then方法
```
/**
 * 需求：
 * 1. 构建一个构造器
 * promise有且仅有三种状态 pending,fullfilled,rejected
 * pengding状态可以转fullfilled或者rejected
 * 当状态处于fullfilled状态时，必须有一个value，且不能改变
 * 当状态处于rejected状态时，必须有reason，且不能改变
 * 
 * 2.promise必须提供一个then方法，通过then方法可以访问value或者reson
 * then方法接收两个参数`promise.then(onFulfilled, onRejected)`
 * onFulfilled 和 onRejected 都是可选参数。
 */
```
1.js
```js
//这样写可以避免硬编码
const PENDING = 'pending';
const FULLFILED = 'fullfilled';
const REJECTED = 'rejected';

class MyPromise {
  #state = PENDING;//初始状态为pending
  #value;//成功时返回的值
  #reason;//失败返回的原因
  constructor(executor){
    const resolve = (value)=>{
      if(this.#state!==PENDING) return;//当状态变成fullfilled，就不能再改变
      this.#state=FULLFILED;
      this.#value=value;
    }
    const reject = (reason)=>{
      if(this.#state !== PENDING) return;//当状态变成rejected，就不能再改变
      this.#state = REJECTED;
      this.#reason = reason;
    }
    executor(resolve,reject)
  }
  //onFulfilled和onRejected都是可选方法
  then(onFulfilled = v => v,onRejected= r => { throw r }){
    if(this.#state === PENDING) return;
    if(this.#state === FULLFILED){
      onFulfilled(this.#value);
    }
    if(this.#state === REJECTED){
      onRejected(this.#reason);
    }
  }
}
const p = new MyPromise((resolve,reject)=>{
  resolve(1)
})
p.then(res=>{
  console.log(res)
})
```
说明：
- #是es6的内部属性或方法，不可被外界调用
- executor是Promise构造函数的传参，是一个函数，在构造函数内部被执行,并且这个函数接收两个回调函数，resolve和reject
- 当第一次调用resolve时，状态为改变为fullfiled，且状态凝固，得到value
- 当第一次调用reject时，状态改变为rejected，且状态凝固，得到reason
2. 实现then方法的延迟回调以及多次调用
2.js
```js
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
  //注册中心
  #resolvedCallbacks = []
  #rejectedCallbacks = []
  constructor(executor) {

    const resolve = (value) => {
      if (this.#state !== PENDING) return;
      this.#state = FULLFILED;
      this.#value = value;
      setTimeout(() => {
        if (this.#state === FULLFILED) {
          //发布
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
          //发布
          this.#rejectedCallbacks.forEach(fn => fn())
        }
      });
    }
    executor(resolve, reject)
  }
  then(onFulfilled = v => v, onRejected = r => { throw r }) {
    //订阅事件到注册中心
    this.#resolvedCallbacks.push((v) => onFulfilled(this.#value || v))
    this.#rejectedCallbacks.push((r) => onRejected(this.#reason || r))
  }
}
const p = new MyPromise((resolve, reject) => {
  resolve(1)
})
p.then(res => {
  console.log(res,'res')
})
p.then(res => {
  console.log(res,'res')
})

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 1000);
})
p1.then(res => {
  console.log(res,'p1')
})
```
```js
思路：采用发布订阅方式，具体可以参考手写eventEmitter的思路,
如果以前没自己手写过eventEmitter，请先手写eventEmitter
否则你将及其难以理解promise里面用到的发布订阅原理。
有两个注册中心，一个是成功resolvedCallbacks，一个是失败rejectedCallbacks
每次执行then方法，将注册一次成功或者失败的事件
then(onFulfilled = v => v, onRejected = r => { throw r }) {
  //订阅：收集所有的待发布事件到注册中心
  this.#resolvedCallbacks.push((v) => onFulfilled(this.#value || v))
  this.#rejectedCallbacks.push((r) => onRejected(this.#reason || r))
}
在resolve或者reject里面，也就在立即执行函数里面调用resolve或者reject的时候，
一次性把所有的事件进行发布
setTimeout(() => {
  if (this.#state === FULLFILED) {
    //发布
    this.#resolvedCallbacks.forEach(fn => fn())
  }
});
1.发布订阅的设计
并不是想当然的在promise立即执行函数里面订阅在then里面发布，这可能和想象的发布订阅有点奇怪。
因为在立即执行函数里面，resolve或者reject有可能延迟调用，因此不可能作为订阅方，
而是作为发布方，并且是一次性把几次then注册的结果全部一次性发布掉。
2.为什么要在resolve或者reject里面用setTimeout
这里其实是在模拟微任务
如果不使用setTimout，那么在这种情况下
const p = new MyPromise((resolve, reject) => {
  resolve(1)
})
p.then(res => {
  console.log(res)
})
这种情况下，执行顺序是
1. resolve(1)//调用resolve方法
那么执行this.#resolvedCallbacks.forEach(fn => fn())
2. then()//调用then方法，并且把
res => {
  console.log(res)
}
作为onFulfilled参数
3. this.#resolvedCallbacks.push((v) => onFulfilled(this.#value || v))
然后你会发现发布在前，订阅在后，那么就输出不了
使用setTimeout，就能实现订阅在前，发布在后，因为setTimout里面的发布会等
同步任务执行完再执行异步任务
```
3.链式调用
## 参考
[promiseA+规范中文翻译](https://juejin.cn/post/6844903649852784647?searchId=20230817005247837C23CD5861C4BFE6CC)
[遵循Promises/A+规范，深入分析Promise源码实现(基础篇)](https://juejin.cn/post/7070652109598752798)
[浅显易懂的实现Promise之resolvePromise篇](https://zhuanlan.zhihu.com/p/480562535?utm_id=0)