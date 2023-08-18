var person = { name: "" };
var personCopy = new Proxy(person, {
  get(target, key, receiver) {
    console.log("get方法被拦截。。。");
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set方法被拦截。。。");
    return Reflect.set(target, key, value, receiver);
  },
});
person.name = "arvin"; // 未有拦截日志打出
personCopy.name = "arvin"; // set方法被拦截。。。
console.log(person.name); // 未有拦截日志打出
console.log(personCopy.name); // get方法被拦截。。。
[1, 2].map((item) => item + 1);
