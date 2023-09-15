# setState
## 同步or异步
首先state是不可变值
`this.state.count++`无效，必须使用`setState`
在react上下文里，setState异步
```jsx
//count=1
this.setState({count:this.state.count+1})
console.log(this.state.count)//1
```
在异步里（setTimeout、事件回调），同步
```jsx
//count=1
setTimeout(()=>{
    this.setState({count:this.state.count+1})
    console.log(this.state.count)//2
})
```
在react18，同步
## 如何拿到最新值

```jsx
setState({
    count:2
},()=>{
    console.log(this.state.counnt)//2
})
```
## 合并
合并
```jsx
//count=1
this.setState({count:this.state.count+1})
this.setState({count:this.state.count+1})
this.setState({count:this.state.count+1})
//count：2
```
不合并
```jsx
//count=1
this.setState(()=>({count:this.state.count+1}))
this.setState(()=>({count:this.state.count+1}))
this.setState(()=>({count:this.state.count+1}))
//count：4
```
原因是对象可以用Object.assign等方法去合并，但函数合并不了，只能依次执行