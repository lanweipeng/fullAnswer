function quickSort(arr) {
  return quickSortEx(arr,0,arr.length-1)
}
function quickSortEx(arr,start,end){
  const part=partition(arr, 0, arr.length - 1);
  quickSortEx(arr,start,part)
  quickSortEx(arr,part,end)
}
function partition(arr, start, end) {
  var pivotpos = start;
  var pivot = arr[start];
  var flag='end';
  while(start!==end){
    console.log(start,end)
    if(flag)
    if(arr[end]<pivot){
      arr[pivotpos]=arr[end];
      pivotpos=end;
      pivot=arr[pivotpos]
    }else{
      end--;
    }
    if(arr[start]>pivot){
      arr[pivotpos]=arr[start];
      pivotpos=start;
      pivot=arr[pivotpos]
    }else{
      start++;
    }

  }
  return start
}
console.log(quickSort([4, 2, 6, 9, 5, 6, 10]))