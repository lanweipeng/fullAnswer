const Stack = require("../stack/stack");
class BinTreeNode {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
    this.parentNode = null;
  }
}
class BinaryTree {
  #root = null;
  constructor(str) {
    this.#initTree(str);
  }
  getRoot() {
    return this.#root;
  }
  #initTree(str) {
    const stack = new Stack();
    let newNode = null;
    let k = 0;
    for (let i = 0; i < str.length; i++) {
      const item = str[i];
      if (item === "#") {
        break;
      }
      if (item === "(") {
        k = 1;
        stack.push(newNode);
      } else if (item === ")") {
        stack.pop();
      } else if (item === ",") {
        k = 2;
      } else {
        newNode = new BinTreeNode(item);
        if (!this.#root) {
          this.#root = newNode;
        } else if (k === 1) {
          const topItem = stack.top();
          topItem.leftChild = newNode;
          newNode.parentNode = topItem;
        } else if (k === 2) {
          const topItem = stack.top();
          topItem.rightChild = newNode;
          newNode.parentNode = topItem;
        }
      }
    }
  }
  #inOrder(node) {
    if (node == null) {
      return;
    }
    this.#inOrder(node.leftChild);
    console.log(node.data);
    this.#inOrder(node.rightChild);
  }
  #preOrder(node) {
    if (node == null) {
      return;
    }
    console.log(node.data);
    this.#preOrder(node.leftChild);
    this.#preOrder(node.rightChild);
  }
  preOrderByWhileAndStack() {
    const stack = new Stack();
    let currNode = this.#root;
    while (currNode) {
      console.log(currNode.data);
      if (currNode.rightChild) {
        stack.push(currNode.rightChild);
      }
      if (currNode.leftChild) {
        currNode = currNode.leftChild;
      } else {
        currNode = stack.pop();
      }
    }
  }
  //非递归中序
  inOrderByWhileAndStack() {
    const stack = new Stack();
    let currNode = this.#root;
    while (currNode) {
      stack.push(currNode);
      if (!currNode.leftChild) {
        const node = stack.pop();
        console.log(node.data);
        currNode = stack.pop();
      }
      if (currNode.rightChild) {
        stack.push(currNode.rightChild);
      }
    }
  }

  #postOrder(node) {
    if (node == null) {
      return;
    }
    this.#postOrder(node.leftChild);
    this.#postOrder(node.rightChild);
    console.log(node.data);
  }
  //非递归后序：左右根
  postOrderByWhileAndStack() {
    let currNode = this.#root;
    const stack = new Stack();
    let flag;
    while (1) {
      if (currNode) {
        stack.push(currNode);
        currNode = currNode.leftChild;
      } else {
        currNode = stack.pop();
        if (!currNode.rightChild || flag === tree) {
          console.log(currNode.data);
          currNode = null;
        } else {
          stack.push(currNode);
          flag = true;
          currNode = currNode.rightChild;
        }
      }
      if (stack.isEmpty()) {
        break;
      }
    }
  }
  // console.log:D
  // [ACBE] currNode:E
  //in|pre|post
  prinInOrder(order) {
    if (order === "in") {
      this.#inOrder(this.#root);
    } else if (order === "pre") {
      this.#preOrder(this.#root);
    } else if (order === "post") {
      this.#postOrder(this.#root);
    }
  }
  size() {
    return this.#treeNodeCount(this.#root);
  }
  #treeNodeCount(node) {
    if (!node) {
      return 0;
    }
    const leftCount = this.#treeNodeCount(node.leftChild);
    const rightCount = this.#treeNodeCount(node.rightChild);
    return leftCount + rightCount + 1;
  }
  height() {
    return this.#treeHeight(this.#root);
  }
  #treeHeight(node) {
    if (!node) {
      return 0;
    }
    const leftHeight = this.#treeHeight(node.leftChild);
    const rightHeight = this.#treeHeight(node.rightChild);
    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  }
  #findNode(node, data) {
    if (!node) {
      return null;
    }
    if (node.data === data) {
      return node;
    }
    const leftRes = this.#findNode(node.leftChild, data);
    if (leftRes) {
      return leftRes;
    }
    return this.#findNode(node.rightChild, data);
  }
  find(data) {
    return this.#findNode(this.#root, data);
  }
}
const tree = new BinaryTree("A(B(D,E(G,)),C(,F))#");
// console.log(tree.getRoot());
// tree.prinInOrder("in");
// tree.prinInOrder("pre");
tree.prinInOrder("post");
// console.log(tree.size());
// console.log(tree.height());
// console.log(tree.find("F"));
// tree.preOrderByWhileAndStack();
// tree.inOrderByWhileAndStack();
console.log("---");
// tree.preOrderByWhileAndStack();
tree.postOrderByWhileAndStack();
//中序：DBGEACF
