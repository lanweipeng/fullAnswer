//1
const foo = {
  bar: 10,
  fn: function () {
    console.log(this);
    console.log(this.bar);
  },
};
var fn1 = foo.fn;
foo.fn();
fn1();
