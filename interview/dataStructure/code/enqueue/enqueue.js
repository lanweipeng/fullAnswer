/**
 * enqueue(item) 队列尾部添加一个元素
 * dequeue(item) 队列头部删除一个元素
 * head():item 返回头部元素
 * size():number 队列大小
 * clear() 清空队列
 * isEmpty():boolean 队列是否为空
 */
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item) {
    this.items.push(item);
  }
  dequeue() {
    return this.items.shift();
  }
  head() {
    return this.items[0];
  }
  size() {
    return this.items.length;
  }
  clear() {
    this.items = [];
  }
  isEmpty() {
    return this.items === 0;
  }
}
module.exports = Queue;
