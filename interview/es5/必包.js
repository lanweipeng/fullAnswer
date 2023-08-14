function fn1(){
  var a = 1;
  return function fn2(){
    console.log(a++);
  }
}
var fn = fn1();
fn();//1
fn();//2
// for循环
for(var i = 0; i < 9; i++){
  (function(i){
    console.log(i);
  })(i)
}
//模块化实现
(function(){
  function add(a, b){
    return a + b;
  }
  function sub(a, b){
    return a - b;
  }
  globalThis.countFn={
    add:add,
    sub:sub
  }
})();
var sum=countFn.add(1,2);
console.log(sum)

//封装私有变量和函数
function createPerson(){
  var _name;
  return {
    getName:function(){
      return _name;
    },
    setName:function(name){
      _name = name;
    }
  }
}
var lwp=createPerson();
lwp.setName('兰为鹏')
console.log(lwp.getName())