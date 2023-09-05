setTimeout(() => {
 console.log('setTimeout') 
});
setImmediate(()=>{
  console.log('setImmediate')
})
// new Promise((resolve)=>{
//   resolve(1)
// }).then(res=>{
//   console.log(res)
// })