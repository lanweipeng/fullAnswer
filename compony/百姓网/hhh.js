//面试题
//处理下面的数据结构转化
const initList = [{
  type:'age',
  data:[12,31,53]
},{
  type:'name',
  data:['wzc','wzc1','wzc2','wzc3']
},{
  type:'sex',
  data:['男','女']
}]
function transformStruct(array){
  let maxLen=0;
  for(let i=0;i<array.length;i++){
    const item=array[i];
    maxLen=Math.max(maxLen,item.data.length)
  }
  const arr = new Array(maxLen).fill({});
  return arr.map((item,i)=>{
    for(let j=0;j<array.length;j++){
      const data=array[j]?.data
      const type=array[j]?.type
      if(data[i]){
        item[type]=data[i];
      }
    }
    return item;
  })
  return arr
}
console.log(transformStruct(initList))
//期望
const resultList = [{
  name:'wzc',
  age:12,
  sex:'男'
},{
  name:'wzc1',
  age:31,
  sex:'女'
},{
  name:'wzc2',
  age:53
},{
  name:'wzc3'
}]