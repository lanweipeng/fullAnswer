//加上Symbol
var student = {
  name: "lwp",
  sayHello: function (age) {
    console.log(`my name is ${this.name},I am ${age} old`);
  },
};
Function.prototype.myCall = function (context, ...args) {
  var context = context || globalThis; //globalThisl可能是浏览器的window也可能是node的global
  const key = Symbol("changeThis");
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};
var lwpSayHello = student.sayHello;
lwpSayHello.myCall(student, 29); //my name is lwp,I am 29 old
// 但是有个问题
var student2 = {
  name: "lwp",
  sayHello: function (age) {
    console.log(this);
    console.log(`my name is ${this.name},I am ${age} old`);
  },
};
Function.prototype.myCall = function (context, ...args) {
  var context = context || globalThis; //globalThisl可能是浏览器的window也可能是node的global
  const key = Symbol("changeThis");
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};
var lwpSayHello = student2.sayHello;
lwpSayHello.myCall(student2, 29); //my name is lwp,I am 29 old
//delete context[key]去不掉，因为Symbol是唯一的
Function.prototype.myCall = function (context, ...args) {
  var context = context || globalThis; //globalThisl可能是浏览器的window也可能是node的global
  const key = Symbol("changeThis");
  Object.defineProperty(context, key, {
    enumerable: false,
    value: this,
  });
  const result = context[key](...args);
  return result;
};
lwpSayHello.myCall(student2, 29);
//然后发现不会有Symbol的标志了
