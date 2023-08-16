/**
 * 需求：
 * 1. 构建一个构造器
 * promise有且仅有三种状态 pending,fullfilled,rejected
 * pengding状态可以转fullfilled或者rejected
 * 当状态处于fullfilled状态时，必须有一个value，且不能改变
 * 当状态处于rejected状态时，必须有reason，且不能改变
 * 构造器里面能捕获错误
 * 
 * 2.promise必须提供一个then方法，通过then方法可以访问value或者reson
 * then方法接收两个参数`promise.then(onFulfilled, onRejected)`
 * onFulfilled 和 onRejected 都是可选参数。
 * onFulfilled 和 onRejected如果是函数，里面能捕获错误
 */



//promise有且仅有的三种状态，这样写是为了避免硬编码
const PENDING='pending'
const FULLFILED='fullfilled'
const REJECTED='rejected'

class MyPromise{
  #state = PENDING;//初始状态为pending
  #value;//成功时返回的值
  #reason;//失败返回的原因
  constructor(executor){
    const resolve=(value)=>{
      if(this.#state!==PENDING) return;//当状态变成fullfilled，就不能再改变
      this.#state=FULLFILED;
      this.#value=value;
    }
    const reject=(reason)=>{
      if(this.#state!==PENDING) return;//当状态变成rejected，就不能再改变
      this.#state=REJECTED;
      this.#reason=reason;
    }
    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }
  //onFulfilled和onRejected都是可选方法
  then(onFulfilled=v=>v,onRejected=r=>{throw r}){
    if(this.#state===PENDING) return
    if(this.#state===FULLFILED){
      onFulfilled(this.#value);
    }
    if(this.#state===REJECTED){
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
p.then(res=>{
  setTimeout(() => {
    console.log(res)
  }, 10000);
})