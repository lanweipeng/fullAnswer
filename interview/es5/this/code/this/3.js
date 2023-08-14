const o1 = {
  text: "o1",
  fn: function () {
    return this.text;
  },
};
const o2 = {
  text: "o2",
  fn: function () {
    const m = o1.fn();
    return m;
  },
};
const o3 = {
  text: "o3",
  fn: function () {
    var fn = function () {
      console.log(this);
      return this.text;
    };
    const res = fn();
    return res;
  },
};
console.log(o1.fn()); //o1
console.log(o2.fn()); //o1
console.log(o3.fn()); //undefined
