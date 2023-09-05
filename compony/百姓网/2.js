//手写函数 生成随机6位验证码（必须同时有大小写字母，数字）

function getCode(){
  const arr1=['A','B','C'];//2
  const arr2=['a','b','c'];//2
  const arr3=[1,2,3];//2
  const arrAll=[arr1,arr2,arr3]
  //全排列
  const arr = [[1,2,3],[2,2,2],[1,3,2],[2,1,3],[2,3,1],[3,2,1],[3,1,2]];
  //决定每个数组占比以及顺序
  // const sort = Math.floor(Math.random(1,arr.length))
  const sortItem = Math.round(Math.random() * (arr.length - 1));
  // console.log(sortItem)
  const sortArr=arr[sortItem];
  let string='';
  for(let i=0;i<sortArr.length;i++){
    const n=sortArr[i];
    console.log(n)
    for(let j=0;j<n;j++){
      console.log(randomFromArray(arrAll[i]),arrAll[i])
      string+=randomFromArray(arrAll[i])
    }
    
  }
  return string;
}
console.log(getCode())
//随机从一个数组取值
function randomFromArray(arr){
  const sortItem = Math.round(Math.random() * (arr.length - 1));
  return arr[sortItem];
}
