const { nextTick } = require('node:process');
let person={
  name:'lwp'
}
setTimeout(()=>{
  console.log('setT')
})
let p1 = new Proxy(person,{
  set(){
    console.log('set')
  }
})
nextTick(()=>{
  console.log('nextTick')
})

p1.name='hw'