## 升级
npm i react@18 react-dom@18

原来
```jsx
import {render} from 'react-dom';
const rootElement = document.getElementById('root')
render(<App/>,rootElement)
```
现在
```jsx
import {createRoot} from 'react-dom/client';
const rootElement = document.getElementById('root')
const root=createRoot(rootElement)
root.render(<App/>,rootElement)
```
18的升级是渐进式升级，很多新功能是可选的，并不会因为升级对以前的代码带来破坏性的影响
## 放弃兼容ie
17能兼容ie11，18不兼容，如果要兼容，只能回退react版本。

## automatic Batching自动批处理

```jsx
const [count, setCount]=useState(0);
const [name, setName]=useState('');
setTimeout(()=>{
  setCount(1);
  setName('lwp');
})
```
18之前：异步里面不会自动批处理，会触发两次set
18之后会触发一次set
如果不想使用automatic Batching
```jsx
import {flushSync} from 'react-dom'
flushSync(()=>{
  setCount(1);
  setCount(2);
})
```
不想用automatic batching场景
- 你需要在状态之后，立刻读取dom上的数据

在17之前，class组件的异步代码里面的setState是同步，而18之后所有的场景下都是异步的，如果想要变成同步，依然用flushSync
```jsx
class Counter{
  constructor(){
    this.state={
      count:0
    }
  }
  fn=()=>{
    setTimeout(()=>{
      this.setState({count:count+1})
      //React 17:1
      //React 18:0
      console.log(count)
  })
  }
}
```
```jsx
  setTimeout(()=>{
    flushSync(()=>{
        this.setState({count:count+1})
        //React 17:1
        //React 18:0
        console.log(count)
    })
  })

```
## 返回值
原来组件只能返回null，现在既可以返回null也可以返回undefined

## concurrent并发渲染
原来渲染只能一个一个触发（串行），且不可中断
现在
- 渲染可暂停、可继续、可终止
- 渲染可以在后台进行
- 渲染可以有优先级
## transitions
渲染优先级里面分为高优先级和低优先级，默认高优先级，通过transitions来标记低优先级
class
```jsx
import {startTransitions} from 'react'
startTransitions(()=>{
  xxx
})
```
hook
```jsx
import {useTransitions} from 'react'
const [pending, startTransitions] = useTransitions()
startTransitions(()=>{
  xxx
})
```
## Suspense
以前我们进行异步请求都是fetch then render
```jsx
function Father(){
  const [title,setTitle]=useState();
  useEffect(()=>{
    getTitle().then(res=>{
      setTitle(res)
    })
  },[])
  return (<div>
    {!title?<Loading/>:title}
    <Child/>
  </div>)
}
function Child(){
    const [list,setList]=useState();
  useEffect(()=>{
    getList().then(res=>{
      setList(res)
    })
  },[])
  return (<div>
    {!list&&<Loading/>}
    {list&&list.map(item=>(<div>{item}</div>))}
  </div>)
}
```
这样就会导致两个组件的请求是串行，增加渲染时间
为了改变这种方式，可以通过Promise.all改造成并行，但是这种方式依然有缺点，就是两次请求必须都完成才能进行渲染。于是有了Suspense。fetch as you render
```jsx
function Father(){
  const [title,setTitle]=useState();
  useEffect(()=>{
    getTitle().then(res=>{
      setTitle(res)
    })
  },[])
  return (<Suspense fallback=(<Loading/>)>
    
    <Suspense fallback=(<Loading/>)><Child/></Suspense>
  </Suspense>)
}
function Child(){
    const [list,setList]=useState();
  useEffect(()=>{
    getList().then(res=>{
      setList(res)
    })
  },[])
  return (<div>
    {list.map(item=>(<div>{item}</div>))}
  </div>)
}
```
```jsx
//并行
<Suspense1></Suspense1>
<Suspense2></Suspense2>
//串行
<Suspense1><Suspense2></Suspense2></Suspense1>

```
## 参考
- [React18 新特性解读 & 完整版升级指南](https://juejin.cn/post/7094037148088664078?searchId=2023100820220813F3E975FC74B02390F3)
- [【骇客说】一次搞懂 React 18 到底更新了什么](https://www.bilibili.com/video/BV1US4y1P7CC/?spm_id_from=333.337.search-card.all.click&vd_source=1717bca8aebff18ca2591bd114c54e3f)