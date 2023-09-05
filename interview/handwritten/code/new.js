function createObj(){
  const Father = [].shift.call(arguments);
  if(typeof Father!=='function'){
    return
  }
  // let son = Object.create(Father.prototype);
  let son = {}
  son.__proto__ = Father.prototype
  const result = Father && Father.apply(son, arguments)
  return (result && typeof result === 'object')? result : son;
}
function Student(name){
  this.name = name;
}
Student.prototype.setName=function(name){
  console.log(this)
  this.name = name;
}
Student.prototype.getName=function(name){
  return this.name;
}
let s1 = new Student();

s1.setName('lwp');
console.log(s1.getName())
console.log(s1.__proto__===Student.prototype)
console.log(s1.constructor===Student)

let s2 = createObj(Student, 'hw');
console.log(s2)
console.log(s2.getName())
console.log(s2.__proto__===Student.prototype)
console.log(s2.constructor===Student)

function newFn(Constructor,...param){
  let newObj = {};
  newObj.__proto__=Constructor.prototype;
  const res=Constructor.prototype.constructor.call(newObj,...param);
  return typeof res==='object'?res:newObj;
}


let s3 = newFn(Student,'lwp');
console.log(s3)
