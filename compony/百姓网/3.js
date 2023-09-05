//给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 
//a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组
// [-1 -2 3,0,1,2]
function sort(arr){
  return sortFn(arr,0,arr.length);
}
function sortFn(arr,start,end){
  const middle =  Math.round(Math.random() * (arr.length - 1));
  if(middle<left){
    return sortFn(start,middle)
  }else{
    return sortFn()
  }
}

  sort([1,2,3,6,2])


