var twoSum = function (nums, target) {
  let start = 0,
    end = nums.length - 1;
  while (true) {
    if (target < 0) {
      if (nums[start] + nums[end] < target) {
        end--;
      } else if (nums[start] + nums[end] > target) {
        start++;
      } else {
        return [start, end];
      }
    } else {
      if (nums[start] + nums[end] > target) {
        end--;
      } else if (nums[start] + nums[end] < target) {
        start++;
      } else {
        return [start, end];
      }
    }
  }
};
console.log(twoSum([-1, -2, -3, -4, -5], -8));
