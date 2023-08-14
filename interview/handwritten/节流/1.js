function throttle(func, wait) {
  let oldTime = 0;
  return function () {
    let newTime = new Date().valueOf();
    if (newTime - oldTime > wait) {
      func.apply(this, arguments);
      oldTime = newTime;
    }
  };
}
