- 同步

```js
function sleep(delay) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < delay) {
    continue;
  }
}
```

参考：

- [5 种方式](https://blog.p2hp.com/archives/8913)
- [异步方式](https://juejin.cn/post/7218576561842192443?searchId=202308141516027B057522F59E0EFA303E)
