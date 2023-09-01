// 定义两个抽象类，观察者和抽象者
/**
 * 被观察者
 * observers 观察者列表
 * add 添加观察者
 * remove 移除观察者
 * notify 通知到所有的观察者
 */
class Observed {
  constructor() {
    this.observers = [];
  }
  add(observer) {
    this.observers.push(observer);
  }
  remobe(observer) {
    this.observers.filter((item) => item === observer);
  }
  notify() {
    this.observers.forEach((item) => item.update(this));
  }
}
/**
 * 观察者
 * 更新
 */
class Observer {
  constructor() {}
  update() {}
}
// 定义两个具体类，实现下面的需求
// 产品和UI、开发、测试进行第二版功能开发，其他成员都在等产品的prd文档修改，等修改完成之后，开始进展各自的工作
class PM extends Observed {
  constructor() {
    super();
    this.prd = "第一版";
  }
  getPrd() {
    return this.prd;
  }
  updatePrd(prd) {
    this.prd = prd;
    this.notify();
  }
}
class RD extends Observer {
  constructor() {
    super();
    this.prd = null;
  }
  update(pm) {
    this.prd = pm.getPrd();
    this.work();
  }
  work() {
    console.log(`拿着${this.prd}进行开发`);
  }
}
class UI extends Observer {
  constructor() {
    super();
    this.prd = null;
  }
  update(pm) {
    this.prd = pm.getPrd();
    this.work();
    // pm.notify();循环引用
  }
  work() {
    console.log(`拿着${this.prd}进行设计视觉稿`);
  }
}
const xiaoli = new PM();
const xiaohong = new UI();
const xiaoming = new RD();
xiaoli.add(xiaohong);
xiaoli.add(xiaoming);
xiaoli.updatePrd("第二版");
xiaoli.updatePrd("第三版");
