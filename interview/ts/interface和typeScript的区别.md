interface是接口，用来描述对象，type是类型别名。
区别
- type可以声明基本类型、联合类型、交叉类型、元组，interface不行
```ts
type Name = string//基本类型
type arrItem = string | number //联合类型
type Person={
  name
}
type Student = Person & { grade: number }//交叉类型
type Teader = Person & { major: string }//交叉类型
type StudentAndTeaderList = [Student, Teader]//元祖
```
- interface可以允许重复类型，type不行
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
## 参考
- [TS 中 interface 和 type 究竟有什么区别？](https://juejin.cn/post/7063521133340917773?searchId=20230910061510DF5A696532239CEAD5C9)