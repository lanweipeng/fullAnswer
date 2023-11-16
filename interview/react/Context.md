## class组件
```jsx
const ThemeContext = createContext(null)
class Father extends Component{
  //static contextType = ThemeContext 方式二
  render(){
    
    reutrn (
      <ThemeContext.Provider value={1}>
        <Child/>
      </ThemeContext.Provider>
    )
  }
}
class Child extends Component{
  this.context//1
  render(){
    return (

    )
  }
}
Child.contextType=ThemeContext//方式一
```
## hook
```jsx
const ThemeContext = createContext(null)
function Father (){
  render(){
    
    reutrn (
      <ThemeContext.Provider value={1}>
        <Child/>
      </ThemeContext.Provider>
    )
  }
}
function Child (){
  const themeContext = useContext(ThemeContext)//1
  render(){
    return (

    )
  }
}
```
## 函数组件
```jsx
const ThemeContext = createContext(null)
class Father extends Component{
  //static contextType = ThemeContext 方式二
  render(){
    
    reutrn (
      <ThemeContext.Provider value={1}>
        <Child/>
      </ThemeContext.Provider>
    )
  }
}
function Child(){
    return (
      <ThemeContext.Comsumer>
        {value=><div>{value}</div>}
      </ThemeContext.Comsumer>
    )
}
Child.contextType=ThemeContext//方式一
```
## 应用场景
- 主题（夜间模式、长辈模式）
- Redux
- Router