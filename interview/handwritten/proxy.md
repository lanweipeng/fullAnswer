proxy 底层是通过 Object.defineProperpty 实现的

先来实现最基本的功能

```js
const person = {
  name: "lwp",
};
const obj = new Proxy(person, {
  get: function (target, propKey, receiver) {
    console.log("get");
    return target[propKey];
  },
  set: function (target, propKey, value, receiver) {
    console.log("set");
    target[propKey] = value;
  },
});
obj.name = "pxh";
console.log(obj.name);
```

```js
class MyProxy {
  constructor(target, handle) {
    const newTarget = deepcClone(target);
    Object.keys(newTarget).forEach(function (key) {
      Object.defineProperty(newTarget, key, {
        get: function () {
          return handle.get && handle.get(target, key);
        },
        set: function (newVal) {
          handle.set && handle.set(target, key, newVal); //target如果换成newTarget就会变成死循环
        },
      });
    });
    return newTarget;
  }
}
```

## 参考

[简易实现](https://blog.csdn.net/shabbyaxe/article/details/111876095)
