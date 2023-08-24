function bubbleSort(arr){
  let exchange;
  for(let i=0;i<arr.length;i++){
    exchange = false // 标识是否有数据交换
    for(let j=0;j<arr.length-i;j++){
      exchange=true
      if(arr[j]>arr[j+1]){
        let temp=arr[j];
        arr[j]=arr[j+1];
        arr[j+1]=temp;
      }
    }
    if(!exchange) return arr
  }
  return arr;
}
const res=bubbleSort([1,2,6,2,8,4,20,56,7])
console.log(res)