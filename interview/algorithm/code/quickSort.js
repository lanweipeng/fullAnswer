function quickSort(arr) {
  quick_sort(arr, 0, arr.length - 1);
  return arr;
}
function quick_sort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let reference = arr[start];
  let p1 = start;
  let p2 = end;
  while (p1 < p2) {
    if (p1 < p2 && arr[p2] >= reference) {
      p2--;
    }
    if (p1 < p2 && arr[p1] <= reference) {
      p1++;
    }
    if (p1 < p2) {
      let temp = arr[p1];
      arr[p1] = arr[p2];
      arr[p2] = temp;
    }
  }
  arr[start] = arr[p1];
  arr[p1] = reference;
  quick_sort(arr, start, p1 - 1);
  quick_sort(arr, p1 + 1, end);
}
console.log(quickSort([2, 5, 7, 2, 5, 1, 93, 4, 6, 10]));
