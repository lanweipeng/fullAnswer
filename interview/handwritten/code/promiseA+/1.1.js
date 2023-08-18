const PENDING = "pending";
const FULLFILED = "fullfiled";
const REJECTED = "rejected";
class MyPromise {
  #state = PENDING;
  #value;
  #reseaon;
  constructor(executor) {
    const resolve = (value) => {
      if (this.#state === PENDING) {
        this.#value = value;
      }
    };
    const reject = (reason) => {
      if (this.#state === PENDING) {
        this.#reason = reason;
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
}
