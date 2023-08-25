const lwp = {
  name: "兰为鹏",
  cat: {
    name: "白芍",
    gender: "小母猫",
  },
};
function get(obj, str) {
  if (!obj) return;
  const arr = str.split(".");
  return arr.reduce((o, k) => {
    return (o || {})[k];
  }, obj);
}
console.log(get(lwp, "cat.name"));
console.log(get(lwp, "cat.age"));
