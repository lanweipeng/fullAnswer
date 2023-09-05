const arr = [
  {
    name: "bfc",
    link: "https://github.com/lanweipeng/fullAnswer/blob/master/interview/css/bfc.md",
  },
  {
    name: "必包",
    link: "https://github.com/lanweipeng/fullAnswer/blob/master/interview/es5/必包.md",
  },
  {
    name: "语义化",
    link: "https://github.com/lanweipeng/fullAnswer/blob/master/interview/html/语义化.md",
  },
  {
    name: "eventEmitter",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/handwritten/eventEmitter.md",
  },
  {
    name: "eventEmitter",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/handwritten/eventEmitter.md",
  },
  {
    name: "call、apply、bind",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/handwritten/call、apply、bind.md",
  },
  {
    name: "new",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/handwritten/new.md",
  },
  {
    name: "instanceOf",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/handwritten/instanceOf.md",
  },
  {
    name: "sleep",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/handwritten/sleep.md",
  },
  {
    name: "深拷贝",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/handwritten/sleep.md",
  },
  {
    name: "节流",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/handwritten/节流.md",
  },
  {
    name: "防抖",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/handwritten/防抖.md",
  },
  {
    name: "flattern",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/handwritten/flattern.md",
  },
  {
    name: "长度单位",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/css/长度单位.md",
  },
  {
    name: "css哪些熟悉可以让硬件加速",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/css/css哪些熟悉可以让硬件加速.md",
  },
  {
    name: "flex",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/css/flex.md",
  },
  {
    name: "盒模型",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/css/盒模型.md",
  },
  {
    name: "css属性合集",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/css/css属性合集.md",
  },
  {
    name: "十大排序算法",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/algorithm/十大排序算法.md",
  },
  {
    name: "树",
    link: "https://github.com/lanweipeng/fullAnswer/tree/master/interview/dataStructure/树.md",
  },
];
let randomIndex = Math.round(Math.random() * (arr.length - 1));
console.log(arr[randomIndex].name);
console.log(arr[randomIndex].link);
