//call怎么用
var student = {
  name: "lwp",
  sayHello: function (age) {
    console.log(`my name is ${this.name},I am ${age} old`);
  },
};
var lwpSayHello = student.sayHello;
lwpSayHello(); //my name is undefined,I am undefined old
lwpSayHello.call(student, 29); //my name is lwp,I am 29 old

//手写一个call
Function.prototype.myCall = function (context, ...args) {
  var context = context || globalThis; //globalThisl可能是浏览器的window也可能是node的global
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
lwpSayHello.myCall(student, 29); //my name is lwp,I am 29 old
//为什么要借助context.fn,如果不用context.fn会发生什么
Function.prototype.myCall2 = function (context, ...args) {
  var context = context || globalThis; //globalThisl可能是浏览器的window也可能是node的global
  var fn = this;
  const result = fn(...args);
  return result;
};
lwpSayHello.myCall2(student, 29); //my name is undefined,I am 29 old，原因是this没有绑定
