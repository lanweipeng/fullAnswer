//bind.js基本实现功能，但是有个问题
//new的优先级比bind高
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
const say = lwpSayHello.bind(student, 29);
new say("男"); //my name is undefined,I am 29 old,my gender is 男

const say2 = lwpSayHello.myBind(student, 29);
new say2("男"); //my name is lwp,I am 29 old,my gender is 男
//改一下myBind
Function.prototype.myBind2 = function (context, ...args) {
  const _context = context || globalThis; //globalThisl可能是浏览器的window也可能是node的global
  const that = this;
  return function F(...innerArgs) {
    return that.apply(this instanceof F ? this : _context, [
      ...args,
      innerArgs,
    ]);
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
const say3 = lwpSayHello.bind(student, 29);
new say3("男"); //my name is undefined,I am 29 old,my gender is 男

const say4 = lwpSayHello.myBind2(student, 29);
new say4("男"); //my name is undefined,I am 29 old,my gender is 男

Function.prototype.mybind3=function(context,...args){
  const _context = context || globalThis;
  const that = this;
  return function F(...innerArgs){
      if(this instanceof F){
        that(...args,...innerArgs)
      }else{
        that.apply(_context,[...args,...innerArgs])
      }
  }
}
const say5 = lwpSayHello.mybind3(student, 29);
new say5("男"); //my name is undefined,I am 29 old,my gender is 男


async function async1() {
	console.log("async1 start");
	await async2();
	console.log("async1 end");
    }
    async function async2() {
        console.log("async2");
    }
    console.log("js start");
    setTimeout(function () {
        console.log("timeout");
    }, 0);
    async1();
    new Promise(function (resolve) {
        console.log("promise");
        resolve();
    }).then(function () {
        console.log("then");
    });
    console.log("js end");

作者：康
链接：https://juejin.cn/post/6970978621573824525
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。