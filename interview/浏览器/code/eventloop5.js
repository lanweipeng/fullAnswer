const channel = new MessageChannel();
const massage = {data:'lwp'}
channel.port1.postMessage(massage);
channel.port2.onmessage=function(event){
  console.log(event.data)
}
setTimeout(()=>{
  console.log('set')
})