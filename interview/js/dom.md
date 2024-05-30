## 获取dom
document.getElementById
document.getElementsByClassName
document.getElementsByTagName
document.getElementsByName
document.querySelector获取一个
document.querySelectorAll获取全部
## dom的property
var dom1 = document.getElementById('root');
dom1.style.width=100
dom1.className='hhh'
## dom的attribute
```html
var dom1 = document.getElementById('root');
dom1.setAttribute('data-name','hhh')
<div data-name="hhh" id="root"></div>
```
## dom的增删改查
```html
<body>
  <div id="root"></div>
  <script>
    var dom = document.getElementById('root');
    const p1 = document.createElement('p');
    p1.innerHTML = 'p1';
    const p2 = document.createElement('p');
    p2.innerHTML = 'p2';
    //增
    dom.appendChild(p1)
    dom.appendChild(p2)
    setTimeout(() => {
      //删
      dom.removeChild(p1)
    }, 2000);
    dom.children[1].style='background:red';
    console.log(dom.children)
  </script>
</body>
```
## dom性能
查询
```js
for(let i = 0;i<document.getElementByTagName('p').length;i++){
  //xxx
}
->
var length = document.getElementByTagName('p').length;
for(let i = 0;i<length;i++){
  //xxx
}
```
插入
```js
var root = document.getElementById('root')
for(let i=0;i<100;i++){
  var p = document.createElement('p');
  root.appendChild(p)
}
->
var root = document.getElementById('root');
var flag = document.createDocumentFragment();//dom片段，只是变量，不会操作dom
for(let i=0;i<100;i++){
  var p = document.createElement('p');
  flag.appendChild(p)
}
root.appendChild(flag)
```
