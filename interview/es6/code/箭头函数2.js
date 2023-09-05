const fn = ()=>{//定义在全局
  console.log(this)//非严格模式指向全局，严格模式指向undefined
}
fn();
function fn1(){
  setTimeout(()=>{//定义在fn1
    console.log(this.a)//1
  })
}
fn1.call({a:1})//fn1.a=1
class Person{
  constructor(){
    this.name='lwp'
  }
  getName=()=>{//定义在构造函数里
    console.log(this.name)
  }
}
const p = new Person();
const {getName} = p
getName()//lwp