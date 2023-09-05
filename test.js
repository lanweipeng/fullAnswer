function quickSort(arr){
  quick_sort(arr,0,arr.length)
  return arr
}
function quick_sort(arr,start,end){
  let reference=arr[start];
  let p1=start,p2=end;
  while(p1<p2){
    while(p1<p2&&arr[start]<=reference){
      p1++
    }
    while(p1<p2&&arr[end]>=reference){
      p2++;
    }
    if(p1<p2){
      [arr[start],arr[end]]=[arr[end],arr[start]]
    }
  }
  arr[]
}
console.log(quickSort([4,1,6,3]))