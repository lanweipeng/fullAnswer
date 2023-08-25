function quick_sort(arr, start, end) {
  //递归临界条件
  if (start >= end) return;
  //选取数组第一个元素为基准
  reference = arr[start];
  (p1 = start), (p2 = end);
  while (start < end) {
    //右指针向左移动，寻找比基准小的元素
    while (end > start && arr[end] >= reference) {
      end--;
    }
    //左指针向右移动，寻找比基准大的元素
    while (end > start && arr[start] <= reference) {
      start++;
    }
    //将左右指针指向元素进行交换
    if (start < end) {
      temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
    }
  }
  //将基准跟指针位置元素进行交换
  arr[p1] = arr[start];
  arr[start] = reference;
  //递归排序左数组
  quick_sort(arr, p1, start - 1);
  //递归排序右数组
  quick_sort(arr, start + 1, p2);
}
