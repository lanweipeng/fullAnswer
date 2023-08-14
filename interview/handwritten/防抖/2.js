function debounce(fn, wait, immediate = false) {
  let timer = 0;
  let isInvoke = false;
  return function (...args) {
    if (timer) clearTimeout(timer);
    if (immediate && !isInvoke) {
      fn.apply(this, args);
      isInvoke = true;
    } else {
      timer = setTimeout(() => {
        !immediate && fn.apply(this, args);
        isInvoke = false;
      }, wait);
    }
  };
}

let i = 0;
function add() {
  console.log(i++);
}

const add1 = debounce(add, 3000, true);
add1();
add1();
add1();

add1();
setTimeout(() => {
  add1();
}, 3100);
add1();
