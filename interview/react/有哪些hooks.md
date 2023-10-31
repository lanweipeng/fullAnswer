## useState
```jsx
const [count, setCount] = useState(1)
```
## useEffect
```jsx
useEffect(()=>{},[])//模拟componentDidMount
useEffect(()=>{},[count])//模拟componentDidUpdate
useEffect(()=>{})//模拟render
useEffect(()=>{
  return ()=>{
    //模拟componentWillUnmount
  }
})
```
## useLayoutEffect
是useEffect的一种，跟useEffect的区别
useEffect是异步执行，useLayoutEffect是同步执行
```jsx
const [name,setName] = setState('lwp')
useEffect(()=>{
  for(let i = 0;i<100000000;i++){

  }
  setName('兰为鹏')
})
```
会发现一开始lwp，然后闪成兰为鹏
```jsx
const [name,setName] = setState('lwp')
useLayoutEffect(()=>{
  for(let i = 0;i<100000000;i++){

  }
  setName('兰为鹏')
})
```
会发现一开始一直是兰为鹏
因为useLayoutEffect是跟渲染是同步执行，会等dom更新之后，再去绘制到浏览器上面去
缺点：会阻塞
## 参考
- [【React Hooks】掌握及对比常用的8个Hooks（优化及使用场景）](https://blog.csdn.net/qq_40597589/article/details/112462395)