/**
 * 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。candidates 中的每个数字在每个组合中只能使用 一次 。
 * 注意：解集不能包含重复的组合。

  示例 1:
    输入: candidates = [10,1,2,7,6,1,5], target = 8,
    输出:
    [
      [1,1,6],
      [1,2,5],
      [1,7],
      [2,6]
    ]
  示例 2:

  输入: candidates = [2,5,2,1,2], target = 5,
  输出:
  [
    [1,2,2],
    [5]
  ]
 * 
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */ 
function findGentle(candidates,target){
  candidates = candidates.filter(item=>item<=target).sort((a,b)=>a-b)
  let arr=[];
  function findPossibility(target,temp,start){
    if(target<0){
      return
    }
    if(target===0){
      arr.push(temp)
      return
    }
    for(let i=start;i<candidates.length;i++){
      const item = candidates[i];
        findPossibility(target-item,[...temp,item],i+1)
    }
  }
  findPossibility(target,[],0)
  return deduplicateArr(arr);
}
function deduplicateArr(arr){
  let strArr = arr.map(item=>item.join(''));
  strArr = Array.from(new Set(strArr))
  const res = strArr.map(item=>{
    const array = item.split('');
    return array.map(i=>+i)
  })
  return res;
}
/**
 * 
function findGentle(candidates,target){
  const arr = [];

  candidates = candidates
  .filter(item=>item<=target)
  .sort((a,b)=>a-b)

  function dfs (tempArr,start,remain){
    if(remain===0&&!includesArr(arr,tempArr)){
      arr.push(tempArr)
    }
    if(remain<0){
      return
    }
    for(let i=start;i<candidates.length;i++){
      dfs([...tempArr,candidates[i]],i+1,remain-candidates[i])
    }
  }
  dfs([],0,target)
  return arr;
}
function includesArr(tdArr,arr){
  return tdArr.some(item=>arrIsSame(item,arr))
}
function arrIsSame(arr1,arr2){
  return arr1.length===arr2.length&&arr1.every((v,i)=>v===arr2[i])
}
 */

console.log(findGentle([2,5,2,1,2],5))
console.log(findGentle([10,1,2,7,6,1,5],8))