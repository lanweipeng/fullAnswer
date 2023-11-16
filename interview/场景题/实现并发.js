
class Tasks {
  constructor(optins = {}) {
    const { maxTask = 3 } = optins;
    this.maxTask = maxTask;
    this.tasks = [];
    this.runingCount = 0;
  }
  add(p) {
    return new Promise((resolve, reject) => {

      this.tasks.push({
        p,
        resolve,
        reject
      })
      this._run();


    })
  }
  _run() {

    if (this.tasks.length !== 0 && this.runingCount < this.maxTask) {
      this.runingCount++;
      const { p, resolve, reject } = this.tasks.shift();
      p().then(resolve, reject)
        .finally(() => {
          this.runingCount--;
          this._run();
        })
    }
  }
}
function ajax(){
  console.log('请求中')
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve();
    }, Math.floor(Math.random()*5+1)*1000);
  })
}
const tasks = new Tasks();

tasks.add(() => ajax())
tasks.add(() => ajax())
tasks.add(() => ajax())
tasks.add(() => ajax())
tasks.add(() => ajax())
tasks.add(() => ajax())
tasks.add(() => ajax())
tasks.add(() => ajax())

tasks.add(() => ajax()).then(() => {
  console.log('终于完成')
})