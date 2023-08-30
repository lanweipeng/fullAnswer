//判断是否为复杂数据类型
const isComplexDataType = (obj) =>
  (typeof obj === "object" || typeof obj === "function") && obj !== null;

const deepClone = function (obj, hash = new WeakMap()) {
  if (hash.has(obj)) return hash.get(obj);

  //如果参数为Date, RegExp, Set, Map, WeakMap, WeakSet等引用类型，则直接生成一个新的实例
  let type = [Date, RegExp, Set, Map, WeakMap, WeakSet];
  if (type.includes(obj.constructor)) return new obj.constructor(obj);

  //遍历传入参数所有属性描述符
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  //继承原型
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);

  // 获取所有 Symbol 类型键
  let symKeys = Object.getOwnPropertySymbols(obj);
  // 拷贝 Symbol 类型键对应的属性
  if (symKeys.length > 0) {
    symKeys.forEach((symKey) => {
      cloneObj[symKey] = isComplexDataType(obj[symKey])
        ? deepClone(obj[symKey], hash)
        : obj[symKey];
    });
  }

  // 哈希表设值
  hash.set(obj, cloneObj);

  //Reflect.ownKeys(obj)拷贝不可枚举属性和符号类型
  for (let key of Reflect.ownKeys(obj)) {
    // 如果值是引用类型并且非函数则递归调用deepClone
    cloneObj[key] =
      isComplexDataType(obj[key]) && typeof obj[key] !== "function"
        ? deepClone(obj[key], hash)
        : obj[key];
  }
  return cloneObj;
};

const seven = {
  name: "seven",
};
const juejin = {
  name: "juejin",
  relative: seven,
};
seven.relative = juejin;
const newObj = deepClone(seven);
console.log(newObj.relative.relative);
