function binarySearch(arr, target, left, right) {
  if (left > right) {
    return false;
  }
  const middle = Math.floor((right + left) / 2);
  if (arr[middle] === target) {
    return true;
  } else if (arr[middle] > target) {
    return binarySearch(arr, target, left, middle - 1);
  } else {
    return binarySearch(arr, target, middle + 1, right);
  }
}
function isInArray(arr, target) {
  return binarySearch(arr, target, 0, arr.length - 1);
}
console.log(isInArray([1, 2, 3, 5, 6, 7, 8, 9, 10, 11], 4));
console.log(isInArray([1, 2, 3, 5, 6, 7, 8, 9, 10, 11], 5));
