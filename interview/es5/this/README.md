## 定义

执行上下文

## this 指向

- 简单调用时，this 指向全局
- 严格模式时，this 指向 undefined
- 对象调用方法时，方法的 this 指向调用的对象
- 使用 call、apply、bind 时，this 指向指定的对象
- 使用 new 关键字时，this 指向创建的对象
- 必包，this 指向全局
- new>call|apply|bind>调用

## 如何改变 this 指向

call、apply、bind

## 必包

闭包的定义很简单：函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。
此时词法作用域和执行作用域不在一个地方,函数 B 里的 this 指向全局，使用过的变量会被引用到一个新开辟的内存空间

```js
function A() {
  let a = 1;
  function B() {
    console.log(a); //此时a会放入一个新开辟的内存，并且函数执行完并不会销毁
  }
  return B;
}
```

## 参考

- 爪哇教育
  ![图片](爪哇.png)
