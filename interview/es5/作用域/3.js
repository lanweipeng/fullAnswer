var a=1;//全局作用域
function fn(){//函数级作用域
  b=2;
  {
    let c=3;
      console.log(a,b,c)//块级作用域
  }
  var b;
}
fn();