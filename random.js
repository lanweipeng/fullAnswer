const arr = [
  {
    name: "bfc",
    link: "https://github.com/lanweipeng/fullAnswer/blob/master/interview/css/bfc.md",
  },
  {
    name: "必包",
    link: "https://github.com/lanweipeng/fullAnswer/blob/master/interview/es5/必包.md",
  },
];
let randomIndex = Math.round(Math.random() * (arr.length - 1));
console.log(arr[randomIndex].name);
console.log(arr[randomIndex].link);
