实现一个 eventEmitter，包含 on、once、emit、removeListener 方法
eventEmitter.js

```javaScript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(name, fn) {
    this.events[name] ? this.events[name].push(fn) : (this.events[name] = [fn]);
  }
  emit(name, ...args) {
    const fns = this.events[name];
    fns.forEach((fn) => fn && fn(...args));
  }
  once(name, fn) {
    const onceFn = (...args) => {
      fn && fn(...args);
      this.removeListener(name);
    };
    this.on(name, onceFn);
  }
  removeListener(name) {
    this.events[name] = [];
  }
}
const eventEmitter = new EventEmitter();
eventEmitter.on("ifEat", (food = "饭") => {
  console.log(`吃${food}了吗`);
});
eventEmitter.emit("ifEat", "香蕉");
eventEmitter.emit("ifEat");

eventEmitter.once("ifSleep", () => {
  console.log("睡了吗");
});
eventEmitter.emit("ifSleep");
eventEmitter.emit("ifSleep");

eventEmitter.on("ifGoOut", () => {
  console.log("出来玩呀");
});
eventEmitter.removeListener("ifGoOut");
eventEmitter.emit("ifGoOut");
```

思路：

1. 实现 on 和 emit
2. 实现 removeEventListener
3. 实现 once

这样基本功能就能实现了，直接来优化一波，考虑边界问题
eventEmitter2.js

```javaScript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(name, fn) {
    if (typeof name !== "string" || typeof fn !== "function") {
      return;
    }
    this.events[name] ? this.events[name].push(fn) : (this.events[name] = [fn]);
  }
  emit(name, ...args) {
    if (typeof name !== "string") {
      return;
    }
    const fns = this.events[name];
    fns && fns.forEach((fn) => fn && fn(...args));
  }
  once(name, fn) {
    const onceFn = (...args) => {
      fn && fn(...args);
      this.removeListener(name);
    };
    this.on(name, onceFn);
  }
  removeListener(name, callback) {
    this.events[name] = [];
    callback && callback();
  }
}
```

参考链接
https://juejin.cn/post/6985156199192723487?searchId=20230809161809685D69761634DE545968
