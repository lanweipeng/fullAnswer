## 共同点
减值对的动态集合，支持增删改查键值对
```js
var obj={};
obj.a=1;
obj.a=2;
console.log(obj.a)
delete obj.a
```
```js
const map = new Map();
map.set('a', 1);
map.set('a',2);
map.has('a');
map.delete('a');
```
## 不同点
### 创建方法
Object
```js
var obj={}
var obj1= new Object();
var obj1 = Object.create();
```
Map
```js
const map = new Map([['a',1],['b',2]]);
```
### 键的类型
- `Object`的键必须是`string`或者`Symbol`
- `Map`的键可以任何类型
### 键的顺序
- Object
  - key是无序
  - 对于大于等于0的整数，会按照大小进行排序，对于小数和负数会当作字符串处理
  - 对于string类型会按照定义的属性输出
  - 对于Symbol会过滤，得用Object.getOwnPropertySymbols才能得到
- Map
  - 有序，按照插入的顺序
### 大小
- Object通过Object.keys或者for...in遍历
- Set通过size获取大小
## 序列号
Object可以序列化和反序列化，Map只能序列化
## 应用场景
- Object
  - 数据存储，属性为字符串
  - 需要序列化
  - 当作一个对象的实例，需要保存自己的属性和方法
- Map
  - 会频繁和更新键值对
  - 存储大量数据，尤其是key未知
  - 需要频繁进行迭代处理
## 参考
- [Object和Map的区别](https://blog.csdn.net/weixin_44757417/article/details/124759214)


