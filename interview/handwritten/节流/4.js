function throttle(func, wait, options = {}) {
  let timeout = 0;
  let oldTime = 0;
  const { leading = false, trailing = true } = options;
  return function (...args) {
    let newTime = new Date().valueOf();

    if (newTime - oldTime > wait && leading !== false) {
      func.apply(this, arguments);
      oldTime = newTime;
      if (timeout) {
        //关键代码块
        clearTimeout(timeout);
        timeout = 0;
      }
    }
    if (!timeout && trailing !== false) {
      console.log("hh");
      timeout = setTimeout(() => {
        oldTime = new Date().valueOf(); //关键代码
        timeout = 0;
        func.apply(this, args);
      }, wait);
    }
  };
}
