## 产生对象的三种方法:
- new 
- Object.create
- {}
## new 的过程
1. 生成一个新对象
2. this指向新对象，把构造函数的显示原型和新对象的隐式原型做链接
3. 执行构造函数的代码，给控对象添加属性和方法
4. 返回新对象
## 模拟new关键字
方法1
```js
function createObj(Father, ...arg){
  const son = Object.create(Father.prototype);
  const result = Father.apply(son, arg)
  return (result && typeof result === 'object')? result : son;
}
```
方法2
```js
function createObj(Father, ...arg){
  const son = {};
  son.__proto__ = Father.prototype
  const result = Father.apply(son, arg)
  return (result && typeof result === 'object')? result : son;
}
```

