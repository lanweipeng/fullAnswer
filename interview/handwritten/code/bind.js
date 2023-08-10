Function.prototype.myBind = function (context, ...args) {
  const _context = context || globalThis; //globalThisl可能是浏览器的window也可能是node的global
  const that = this;
  return function (...innerArgs) {
    return that.apply(_context, [...args, innerArgs]);
  };
};

var student = {
  name: "lwp",
  sayHello: function (age, gender) {
    console.log(
      `my name is ${this.name},I am ${age} old,my gender is ${gender}`
    );
  },
};
var lwpSayHello = student.sayHello;
lwpSayHello(); //my name is undefined,I am undefined old
const say = lwpSayHello.bind(student, 29);
say("男"); //my name is lwp,I am 29 old

const say2 = lwpSayHello.myBind(student, 29);
say2("男"); //my name is lwp,I am 29 old
