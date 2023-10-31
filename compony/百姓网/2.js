//手写函数 生成随机6位验证码（必须同时有大小写字母，数字）
function getRandom(max){//[0,26)
  return Math.floor(Math.random()*max)
}
function getCode(){
  const arr1=['A','B','C'];//2
  const arr2=['a','b','c'];//2
  const arr3=[1,2,3];//2
  const arrAll=[arr1,arr2,arr3]
  //全排列
  let string='';
  const arr = [[1,2,3],[2,2,2],[1,3,2],[2,1,3],[2,3,1],[3,2,1],[3,1,2]];
  const orderArr=arr[getRandom(6)]  
  const [numberLen,capitalLen,lowercaseLen]=orderArr;
  // console.log(numberLen,capitalLen,lowercaseLen)
    for(let j=0;j<numberLen;j++){
      string+=arr1[getRandom(3)]
    }
    for(let j=0;j<capitalLen;j++){
      string+=arr2[getRandom(3)]
    }
    for(let j=0;j<lowercaseLen;j++){
      string+=arr3[getRandom(3)]
    }
  return shuffleString(string);
}
function shuffleString(str){
  return str.split('').sort(()=>Math.random()-0.5).join('');
}
console.log(getCode())