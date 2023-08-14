function throttle(func, wait) {
  let timeout = 0;
  let oldTime = 0;
  return function (...args) {
    let newTime = new Date().valueOf();
    if (newTime - oldTime > wait) {
      func.apply(this, arguments);
      oldTime = newTime;
      if (timeout) {
        clearTimeout(timeout);
        timeout = 0;
      }
    }
    if (!timeout) {
      timeout = setTimeout(() => {
        oldTime = new Date().valueOf();
        timeout = 0;
        func.apply(this, args);
      }, wait);
    }
  };
}
