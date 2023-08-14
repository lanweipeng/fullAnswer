function fn1() {
  var n = 4;
  return function () {
    console.log(n++);
  };
}
var bar = fn1();
bar();
bar();
bar();
