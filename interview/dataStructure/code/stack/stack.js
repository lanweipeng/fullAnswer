/**
 * push(item:string) 添加元素到栈顶
 * pop():item 弹出栈顶元素
 * top():item 返回栈顶元素
 * ():boolean 判断是否为空
 * size():number 返回栈里元素的个数
 * clea() 清空栈
 */
class Stack {
  constructor() {
    this.items = [];
  }
  push(item) {
    this.items.push(item);
  }
  pop() {
    return this.items.pop();
  }
  isEmpty() {
    return this.items.length === 0;
  }
  top() {
    return this.items[this.size() - 1];
  }
  size() {
    return this.items.length;
  }
  clear() {
    this.items = [];
  }
}
module.exports = Stack;
