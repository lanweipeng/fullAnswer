## 区别
### 范围
interface是接口，用来描述对象，type是类型别名。
type可以表示：基本类型、对象类型、联合类型、元组、交叉类型、函数
interface
```ts
//对象
interface Person{
  name:string,
  age:number
}
//函数
interface Add{
  (x:number,y:number):number
}
```
type
```ts
type userName = string;//基本类型
//对象类型
type Person = {
  id:userId,
  name: userName
}
type Student = {
  age:number
}
type userId = string | number;//联合类型
type arr = number[]//元组
type StudentP = Person & Student//交叉类型
type add = (x:number,y:number) => number//函数
```
### interface可以允许重复类型
```ts
interface Person{
  name:string
}
interface Person{
  age:number
}
const person:Person{
  name:'lwp',
  age:18
}//重复声明会合并
```
## 相同
- 都可以描述对象和函数
- 都可以被继承
## 参考
- [TS 中 interface 和 type 究竟有什么区别？](https://juejin.cn/post/7063521133340917773?searchId=20230910061510DF5A696532239CEAD5C9)
- [详解TypeScript中type与interface的区别](https://www.jb51.net/article/243639.htm)