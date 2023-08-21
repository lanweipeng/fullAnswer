/**
 * 方法：
 * append，添加一个元素
 * insert，在指定位置插入一个元素
 * remove，删除指定位置的节点
 * removeHead，删除首节点
 * removeTail，删除尾节点
 * indexOf，返回指定元素的索引
 * get，返回指定索引位置的元素
 * head，返回首节点
 * tail，返回尾节点
 * length，返回链表长度
 * isEmpty，判断链表是否为空
 * clear，清空链表
 * print，打印整个链表
 */
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class LinkList {
  constructor(data) {
    this.node = new Node(data);
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  append(item) {
    const node = new Node(item);
    if (head == null) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return true;
  }
  print() {
    const currNode = this.head;
    let str = "";
    while (currNode) {
      str += currNode.data + "->";
      currNode = currNode.next;
    }
    str += "null";
    console.log(str);
    console.log("长度为：" + str.length);
  }
  insert(index, data) {
    if (index === this.length) {
      this.append(data);
    } else if (index > this.length || index < 0) {
      return null;
    } else if (index === 0) {
    }
  }
}
