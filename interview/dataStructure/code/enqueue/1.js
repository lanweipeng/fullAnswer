// 队列实现斐波那契约数
const Queue = require("./enqueue");

/**
 * 思路：
 * 1.把两个1放到队列中
 * 2.使用while循环，用index计数，循环终止条件index<n-2
 * 3.dequeue方法删除头部的一个元素，得到元素delItem
 * 4.head方法得到headItem
 * 5.del+headItem放到队尾
 * 6.index++
 */
function fabonacci(n) {
  const queue = new Queue();
  if (n === 1 || n === 2) {
    return 1;
  }
  queue.enqueue(1);
  queue.enqueue(1);
  let index = 0;
  while (index < n - 2) {
    const delItem = queue.dequeue();
    const headItem = queue.head();
    queue.enqueue(delItem + headItem);
    index++;
  }
  queue.dequeue();
  return queue.head();
}
console.log(fabonacci(3));
