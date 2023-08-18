const arr = [
  {
    name: "1",
    link: "http://baidu.com",
  },
];
let randomIndex = Math.round(Math.random() * (arr.length - 1));
console.log(randomIndex);
console.log(arr[randomIndex].link);
