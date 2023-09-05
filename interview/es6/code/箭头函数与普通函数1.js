const fn = ()=>{
  console.log(this)//非严格模式指向全局，严格模式指向undefined
}
fn();
var name='global'
const obj={
  name:'obj',
  fn:()=>{
    console.log(this.name)//obj
  }
}
const obj1={
  name:'obj1'
}
obj.fn()

const fn1=()=>({name:'lwp'})
console.log(fn1())