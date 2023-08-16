/**
 * then方法返回一个promise
 */

//promise有且仅有的三种状态，这样写是为了避免硬编码
const PENDING='pending'
const FULLFILED='fullfilled'
const REJECTED='rejected'

class MyPromise{
  #state = PENDING;//状态
  #value;//成功时返回的值
  #reseaon;//失败返回的原因
  #handle;
  constructor(executor){
    
    const resolve=(value)=>{
      if(this.#state===PENDING){
        this.#state=FULLFILED;
        this.#value=value;
      }
      if(this.#state===FULLFILED){
        
      }
    }
    const reject=(reason)=>{
      if(this.#state===PENDING){
        this.#state=REJECTED;
        this.#reason=reason;
      }
     
    }
    executor(resolve,reject)
  }
  then(onFulfilled=v=>v,onRejected=r=>{throw r}){
    const promise2 = ()=>new MyPromise((onFulfilled=v=>v,onRejected=r=>{throw r})=>{
      if(this.#state===PENDING) return
        if(this.#state===FULLFILED){
          onFulfilled(this.#value);
      }
      if(this.#state===REJECTED){
        onRejected(this.#reason);
      }
    })
    return promise2;
  }
}
const p = new MyPromise((resolve,reject)=>{
  resolve(1)
})
const newP = p.then(res=>{
  console.log(res)

})
newP.then(res=>{
  console.log(res)
})