## 常见 this 面试题

代码地址：code/
看题说结果

### 1. (来源爪哇)

```js
const foo = {
  bar: 10,
  fn: function () {
    console.log(this);
    console.log(this.bar);
  },
};
var fn1 = foo.fn;
fn1();
//global undefind
```

解答：由于 this 时执行上下文，执行的时候才确定

```js
var fn1 = foo.fn;
```

相当于

```js
var fn1 = function () {
  console.log(this);
  console.log(this.bar);
};
```

普通函数调用，this 指向全局

### 2.(来源 yck)

考察知识点

> new>call|apply|bind>调用

```js
function foo() {
  console.log(this.a);
}
var a = 1;
foo(); //undefined,如果window.a或者globalThis.a=1那么这时候打印出来才是1

var obj = {
  a: 2,
  foo: foo,
};
obj.foo(); //2 谁调用绑定谁

// 以上两者情况 `this` 只依赖于调用函数前的对象，优先级是第二个情况大于第一个情况

// 以下情况是优先级最高的，`this` 只会绑定在 `c` 上，不会被任何方式修改 `this` 指向
var c = new foo(); //undefied
c.a = 3;
console.log(c.a); //3 new 改变this指向

// 还有种就是利用 call，apply，bind 改变 this，这个优先级仅次于 new
```

### 3.(来源爪哇)

```js
const o1 = {
  text: "o1",
  fn: function () {
    return this.text;
  },
};
const o2 = {
  text: "o2",
  fn: function () {
    const m = o1.fn();
    return m;
  },
};
const o3 = {
  text: "o3",
  fn: function () {
    var fn = function () {
      return this.text;
    };
    const res = fn();
    return res;
  },
};
console.log(o1.fn()); //o1
console.log(o2.fn()); //o1
console.log(o3.fn()); //undefined
```

解答：

```js
//1
console.log(o1.fn()); //不用说了
//2

const o2 = {
  text: "o2",
  fn: function () {
    const m = o1.fn();
    return m;
  },
};
//相当于
const o2 = {
  text: "o2",
  fn: function () {
    return o1.fn();
  },
};
//那么
console.log(o2.fn());
//相当于
console.log(o1.fn());
//3
const o3 = {
  text: "o3",
  fn: function () {
    var fn = function () {
      return this.text;
    };
    const res = fn(); //普通函数调用，this指向global
    return res;
  },
};
```

### 4.(来源爪哇)

```js
var number = 5;
var obj = {
  number: 3,
  fn1: (function () {
    var number;
    this.number *= 2;
    number = number * 2;
    number = 3;
    return function () {
      var num = this.number;
      this.number *= 2;
      console.log(num);
      number *= 3;
      console.log(number);
    };
  })(),
};
var fn1 = obj.fn1;
fn1.call(null);
obj.fn1();
console.log(globalThis.number);
```

开始解题
在 window 环境 var 的变量会自动挂到 window，而 node 不会，这里以 window 做举例，node 版本自行体会

```js

//1. var fn1 = obj.fn1，由于obj.fn1是立即执行函数，因此开始执行
//此时global.number=5;
function () {
  var number;//必包.number=undefined
  this.number *= 2;//global.number=10;
  number = number * 2;//必包.number=NaN
  number = 3;//必包.number=3
  //return的函数不需要执行，是赋值给fn1的，但是没调用。
};
//return的函数拷贝过来
fn1=function () {
      var num = this.number;
      this.number *= 2;
      console.log(num);
      number *= 3;
      console.log(number);
    }
//自此:必包.number=3;global.number=10;
//2. fn1.call(null); 那么this指向全局,且开始执行函数
function () {
  var num = this.number;//num=10
  this.number *= 2;//global.number=20
  console.log(num);//c1:10 打印
  number *= 3;//按照词法作用域，必包.number=3,此时number=必包.number=9
  console.log(number);//c2:9 打印
}
//自此:必包.number=9;global.number=20;
//3. obj.fn1();谁调用，this指向谁，所以此时this指向obj
 var num = this.number;//3
this.number *= 2;//6 obj.number=6
console.log(num);//c3:3
number *= 3;//根据词法作用域，找到必包.number=9,此时必包.number*3=27
console.log(number);//c4:27
//自此:必包.number=27,obj.number=6,global.number=20
console.log(window.number);//c5:20
//window打印
10
9
3
27
20
//node打印
NaN
9
3
27
NaN
```
