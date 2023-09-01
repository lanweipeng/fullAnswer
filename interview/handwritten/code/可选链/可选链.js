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
  let res = obj;
  for (let i = 0; i < arr.length; i++) {
    if (res[arr[i]] != null) {
      res = res[arr[i]];
    } else {
      return undefined;
    }
  }
  return res;
}
console.log(get(lwp, "cat.name"));
console.log(get(lwp, "cat.age"));
