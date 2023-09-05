function Person(){

}
var person = new Person();
function instanceOf(left,right){
  const proto = left.__proto__;
  const prototype = right.prototype;
  while(true){
    if(proto===prototype){
      return true;
    }
    if(proto==null){
      return false;
    }
    proto=proto.__proto__;
  }
}
console.log(instanceOf(person,Person))