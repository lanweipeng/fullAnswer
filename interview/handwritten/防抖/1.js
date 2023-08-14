function debounce(fn, wait = 50) {
  let timer = 0;

  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

let i = 0;
function add() {
  console.log(i++);
}

const add1 = debounce(add, 3000);
add1();
add1();

setTimeout(() => {
  add1();
}, 3100);
