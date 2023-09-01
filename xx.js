const a = {
  fruits: ['apple', 'banana'],
  series: {
    apple: ['C'],
    banana: ['A', 'B'],
  }
};
const b = {
  fruits: ['banana', 'orange'],
  animals: ['pig'],
  series: {
    banana: ['B', 'C'],
    orange: ['A'],
  }
}
console.log(merge(a,b));
// 期望输出：
// {
//   fruits: ['apple', 'banana', 'orange'],
//   animals: ['pig'],
//   series: {
//     apple: ['C'],
//     banana: ['A', 'B', 'C'],
//     orange: ['A'],
//   }
// }

function merge  (a, b)  {

  const obj=deepClone(a);

  for(let bKey in b){
    
    if(Array.isArray(obj[bKey])){
      obj[bKey]=mergeArray(obj[bKey],b[bKey])
    }else if(typeof obj[bKey]==='object'&&obj[bKey]!=null){
     obj[bKey]=merge(obj[bKey],b[bKey])
    }else {
      obj[bKey]=b[bKey]
    }
  }
  return obj
}
function deepClone(obj){
  const newObj={}
  for(let key in obj){
    if(typeof obj[key] ==='object'&&typeof obj[key]!=null){
      if(Array.isArray(obj[key])){
        newObj[key]=[...obj[key]]
      }else{
        newObj[key]=deepClone(obj[key])
      }
      
    }else{
      newObj[key]=obj[key]
    }
  }
  return newObj;
}
//['apple', 'banana']+['banana', 'orange']=['apple', 'banana', 'orange']
//思路：先合并，再去重
function mergeArray(arr1,arr2){
  if(!Array.isArray(arr1)||!Array.isArray(arr2)){
    return;
  }
  const arr = [];
  const newArr = [...arr1,...arr2]
  for(let i=0;i<newArr.length;i++){
    if(!arr.includes(newArr[i])){
      arr.push(newArr[i])
    }
  }
  return arr;
}
