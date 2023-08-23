const Stack = require("./stack");
function isLeaglBrackets(str) {
  const stack = new Stack();
  for (let i = 0; i < str.length; i++) {
    const item = str[i];
    if (item === "(") {
      stack.push(item);
    } else if (item === ")") {
      if (stack.isEmpty()) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.isEmpty();
}
console.log(isLeaglBrackets("sdf(ds(ew(we)rw)rwqq)qwewe"));
console.log(isLeaglBrackets("(sd(qwqw)sd(sd))"));
console.log(isLeaglBrackets("()()sd()(sd()fw))("));
