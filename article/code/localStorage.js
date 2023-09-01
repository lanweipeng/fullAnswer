const DAY_1_MILLISECOND = 24 * 60 * 60 * 1000; // 一天多少毫秒

class LanLocalStorage {
  instance;
  constructor(options = {}) {
    const { errCb, timeout } = options;
    this.errCb = errCb;
    this.timeout = timeout;
    this.timeoutList = {};
  }
  getTimeOut(value) {
    //正则匹配
    if (typeof value === "string") {
      if (value.match(/day$/)) {
        const day = +value.match(/^[1-9][0]/g)[0];
        return day * DAY_1_MILLISECOND;
      }
    } else {
      return value;
    }
  }
  set(item, obj, options = {}) {
    const { callback, timeout = this.timeout } = options;
    if (timeout) {
      //重复设置,则重新计时
      this.timeoutList[item] = {
        saveTime: new Date().getTime(),
        timeout: this.getTimeOut(timeout),
      };
    }
    try {
      window.localStorage.setItem(item, JSON.stringify(obj));
    } catch (error) {
      callback && callback(error, item, obj);
      this.errCb && this.errCb("set", error, item, obj);
    }
  }
  get(item, callback) {
    if (this.timeoutList[item]) {
      const { saveTime, timeout } = this.timeoutList[item];
      //过期
      if (saveTime + timeout < new Date().getTime()) {
        window.localStorage.removeItem(item);
        return null;
      }
    }
    let value = window.localStorage.getItem(item);

    try {
      value = JSON.parse(value);
    } catch (error) {
      callback && callback(error, item, value);
      this.errCb && this.errCb("get", error, item, value);
    }
    return value;
  }
  static init(options) {
    const { errCb, timeout } = options;
    if (!LanLocalStorage.instance) {
      LanLocalStorage.instance = new LanLocalStorage({ errCb, timeout });
    }
    return LanLocalStorage.instance;
  }
}
//测试埋点
const localStorage = LanLocalStorage.init({
  errCb: (methods, e, item, value) => {
    console.log("埋点", methods, e, item, value); //收集报错信息进行埋点
  },
  timeout: "30day", //默认全局30天
});
var a = {};
b = { r: a };
a.r = b;
localStorage.set("lwp", a);

//测试过期
localStorage.set(
  "lwpName",
  { name: "lwp" },
  {
    timeout: 1000,
  }
);
setTimeout(() => {
  console.log(localStorage.get("lwpName"));
}, 500);
setTimeout(() => {
  console.log(localStorage.get("lwpName"));
}, 1100);
