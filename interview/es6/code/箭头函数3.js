function Person(){
  this.name='lwp'
  this.getName=()=>{//定义在构造函数里
    console.log(this.name)
  }
}
const p = new Person();
const {getName} = p
getName()//lwp