/**浅拷贝工具方法**/
function deepcClone(myObj) {
  if (typeof myObj != "object" || myObj == null) return myObj;
  var newObj = new Object();
  for (var i in myObj) {
    newObj[i] = deepcClone(myObj[i]);
  }
  return newObj;
}

class MyProxy {
  constructor(target, handle) {
    const newTarget = deepcClone(target);
    Object.keys(newTarget).forEach(function (key) {
      Object.defineProperty(newTarget, key, {
        get: function () {
          return handle.get && handle.get(target, key);
        },
        set: function (newVal) {
          handle.set && handle.set(newTarget, key, newVal);
        },
      });
    });
    return newTarget;
  }
}
const person = {
  name: "lwp",
};
const obj = new MyProxy(person, {
  get: function (target, propKey, receiver) {
    console.log(target, propKey, "get");
    return target[propKey];
  },
  set: function (target, propKey, value, receiver) {
    console.log(target, propKey, "set");
    target[propKey] = value;
  },
});
obj.name = "pxh";
console.log(obj.name, person.name);
