//x个人抱y个自然数
function fn(x, y) {
  const arr = new Array(x).fill(1);
  let index = 0;//坐标
  let i = 0;//计算几步
  while (true) {
    index++
    if(arr[index]===1){
      i++;
    }
    if(i===3){
      arr[index]=0
      i=0;
    }
    if(index===x){
      index=0
    }
    if (arr.filter(i => i === 1).length === 1) {
      break
    }
  }
  return index;
}
console.log(fn(5, 3))