function structralClone(obj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = (ev) => resolve(ev.data);
    port1.postMessage(obj);
  });
}
var a = { b: new RegExp(/[1-9]/) };
// a.self = a;
(async () => {
  const b = await structralClone(a);
  console.log(b);
})();
