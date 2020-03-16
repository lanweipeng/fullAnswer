
// function InstanceOf(inst,type){
//     if(typeof inst !== 'object') return false
//     while(true){
//         if(inst === null) return false
//         if(type.prototype === inst.__proto__) return true
//         inst = inst.__proto__
//     }
// }
function InstanceOf(left, right) {
    // 获得类型的原型
    let prototype = right.prototype
    // 获得对象的原型
    left = left.__proto__
    // 判断对象的类型是否等于类型的原型
    while (true) {
    	if (left === null)
    		return false
    	if (prototype === left)
    		return true
    	left = left.__proto__
    }
}
let s = new String('abc');
typeof s === 'object'// true
console.log( InstanceOf('s',String) ) // true

[1,2].sort(a,b=>a-b)