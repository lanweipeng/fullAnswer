/**
 * 跳上1级，只能1种
 * 跳上2级，可以1+1，也可以2，2种
 * 跳上3级，可以跳上1级，再跳两步，也可以跳上2级，再跳两步
 * 因此f(3)=f(1)+f(2)
 * 因此f(n)=f(n-1)+f(n-2)
 */
function frogJump(n) {
  if (n < 1) {
    return 0;
  }
  if (n === 1) {
    return 1;
  } else if (n === 2) {
    return 2;
  } else {
    const arr = [1, 2];
    for (let i = 2; i < n; i++) {
      arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr[n - 1];
  }
}
console.log(frogJump(10));
