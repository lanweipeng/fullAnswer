function fn(x,y){
  let queue = [];
  for(let i=0;i<x;i++){
      queue[i]=i;
  }
  let count = 0;
  while(queue.length>1){
      const item = queue.shift();
      count++;
      if(count<x){
          queue.push(item)
      }else{
        count=0
      }
  }
  return queue.shift();
}
console.log(fn(5, 3))