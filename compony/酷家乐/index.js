// 即 n 个人围成一个圈，这 n 个人的编号从 0——(n-1)，
//  第一个人（编号为 0 的人）从 1 开始报数，
// 报数为 m 的人离开，再从下一个开始从 1 开始报数，报数为 m
//  的人离开，依次循环下去，直到剩下最后一个人（也可以剩最后两个，少循环一次就是了）
// ，那么，把最后一个人的编号打印出来 。
function fn(n,m){
  const queue = [];
  //构造一个队列
  for(let i=0;i<n;i++){
    queue.push(i+1);
  }
  let count = 0;
  while(queue.length>1){
    const item = queue.shift();
    count++;
 
    if(count<m){
      queue.push(item)
    }else{
      console.log(queue)
      count=0;
    }
  }
  return queue.shift();
}
console.log(fn(5,3))