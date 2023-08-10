Function.prototype.myApply = function (context, args) {
  var context = context || globalThis; //globalThisl可能是浏览器的window也可能是node的global
  const key = Symbol("changeThis");
  Object.defineProperty(context, key, {
    enumerable: false,
    value: this,
  });
  const result = context[key](...args);
  return result;
};
const student = {
  name: "lwp",
  sayHello: function (age, sex) {
    console.log(`my name is ${this.name},my age is ${age},my sex is ${sex}`);
  },
};
var lwpSayHello = student.sayHello;
lwpSayHello.apply(student, [27, "男"]);
lwpSayHello.myApply(student, [27, "男"]);
