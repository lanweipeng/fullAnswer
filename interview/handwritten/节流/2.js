function throttle(func, wait) {
  let timeout = 0;
  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = 0;
        func.apply(this, args);
      }, wait);
    }
  };
}
